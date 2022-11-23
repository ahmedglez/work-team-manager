const { getUserByEmail } = require("../../database/crud/usersCrud");
const { sign } = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
	addAuth,
	deleteAuthByToken,
	getRecoveryCode,
	setRecoveredCode,
	getAuthByToken,
} = require("../lambdas/authFunctions");
const {
	isValidEmail,
	isValidPassword,
	isValidUser,
	isAlreadyLogged,
	isValidRecoveryCode,
	isValidToken,
	isNotAlreadyLogged,
	validateToken,
} = require("../../middlewares/requestValidation");
dotenv.config({
	path: ".env",
});
const nodemailer = require("nodemailer");

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		isValidEmail(req, res);
		isValidPassword(req, res);
		await isValidUser(req, res);
		await isAlreadyLogged(req, res);
	} catch (error) {
		console.log("Error", error);
		throw error;
	}

	const user = await getUserByEmail(email);
	const { id } = user;

	const token = sign({ id: id }, process.env.SECRET_KEY, {
		expiresIn: "1h",
	});
	addAuth(id, email, password, token)
		.then(() => {
			return { token };
		})
		.catch((err) => {
			return err;
		});
	return token;
	setTimeout(() => {
		//delete the token after 1 hour
		deleteAuthByToken(token);
	}, 3600000);
};

const logout = async (req, res) => {
	try {
		isValidToken(req, res);
		await validateToken(req, res);
	} catch (error) {
		console.log("Error", error);
		throw error;
	}
	const token = req.headers.authorization.split(" ")[1];
	deleteAuthByToken(token);
};

const sendRecoveryCode = async (req, res) => {
	try {
		isValidEmail(req, res);
		isValidPassword(req, res);
		await isValidUser(req, res);
		await isNotAlreadyLogged(req, res);
		await isValidToken(req, res);
		await validateToken(req, res);
	} catch (error) {
		console.log("Error", error);
		throw error;
	}
	const { email } = req.body;
	const token = req.headers.authorization.split(" ")[1];
	const recoveryCode = Math.floor(Math.random() * 1000000);
};

module.exports = {
	login,
	logout,
};
