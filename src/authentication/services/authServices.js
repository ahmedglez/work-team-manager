const { getUserByEmail } = require("../../database/crud/usersCrud");
const { sign } = require("jsonwebtoken");
const dotenv = require("dotenv");
const { addAuth, deleteAuthByToken } = require("../lambdas/authFunctions");
const {
	isValidEmail,
	isValidPassword,
	isValidUser,
	isAlreadyLogged,
} = require("../../middlewares/requestValidation");
dotenv.config({
	path: ".env",
});

const authByEmail = async (req, res) => {
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
	const auth = await addAuth(id, email, password, token)
		.then(() => {
			return token;
		})
		.catch((err) => {
			return err;
		});
	setTimeout(() => {
		//delete the token after 1 hour
		deleteAuthByToken(token);
	}, 3600000);
};

const deleteToken = async (token) => {
	const response = await deleteAuthByToken(token);
	return response;
};

module.exports = {
	authByEmail,
	deleteToken,
};
