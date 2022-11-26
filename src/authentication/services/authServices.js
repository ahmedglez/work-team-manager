const {
	getUserByEmail,
	updatePasswordPg,
} = require("../../database/crud/usersCrud");
const { sign } = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
	addAuth,
	deleteAuthByToken,
	setRecoveredCode,
	getAuthByToken,
	updatePassword,
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
const { generateLog } = require("../../middlewares/generateLog");

const { sendRecoveryCodeTo } = require("../../utils/sendEmails");

const login = async (req, res) => {
	const { email, password } = req.body;
	try {
		isValidEmail(req, res);
		isValidPassword(req, res);
		await isValidUser(req, res);
		await isAlreadyLogged(req, res);
	} catch (error) {
		console.log("Error", error);
		generateLog("undentify", "login", error.message);
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
	setTimeout((email) => {
		//delete the token after 1 hour
		deleteAuthByToken(token);
		generateLog(email, "login", "token expired");
	}, 10000);
	return token;
};

const logout = async (req, res) => {
	try {
		isValidToken(req, res);
		await validateToken(req, res);
	} catch (error) {
		console.log("Error", error);
		generateLog("undentify", "logout", error.message);
		throw error;
	}
	const token = req.headers.authorization.split(" ")[1];
	deleteAuthByToken(token);
};

const sendRecoveryCode = async (req, res) => {
	try {
		isValidEmail(req, res);
		await isNotAlreadyLogged(req, res);
		await isValidToken(req, res);
		await validateToken(req, res);
	} catch (error) {
		console.log("Error", error);
		throw error;
	}
	const { email } = req.body;
	const token = req.headers.authorization.split(" ")[1];
	const recoveryCode = Math.round(Math.random() * 999999);
	await setRecoveredCode(token, recoveryCode);
	await sendRecoveryCodeTo(email, recoveryCode);
	return recoveryCode;
};

const changePassword = async (req, res) => {
	try {
		isValidEmail(req, res);
		isValidPassword(req, res);
		isValidToken(req, res);
		isValidRecoveryCode(req, res);
	} catch (error) {
		console.log("Error", error);
		generateLog("undentify", "change password", error.message);
		throw error;
	}
	const { email, password, code } = req.body;

	const token = req.headers.authorization.split(" ")[1];
	const auth = await getAuthByToken(token);
	const { recoveryCode } = auth;
	if (recoveryCode === code) {
		console.log("Code is valid");
		await setRecoveredCode(token, null);
		await updatePassword(token, password);
		await updatePasswordPg(email, password);
	} else {
		throw new Error("Invalid code");
		console.log("Code is invalid");
	}
};

const loginAdmin = async (req, res) => {
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
	if (user.role === "admin") {
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
		setTimeout(() => {
			//delete the token after 1 hour
			deleteAuthByToken(token);
		}, 3600000);
		return token;
	} else {
		throw new Error("User is not an admin");
	}
};

const verifyAdmin = async (req, res) => {
	try {
		isValidToken(req, res);
		await validateToken(req, res);
	} catch (error) {
		console.log("Error", error);
		throw error;
	}
	const token = req.headers.authorization.split(" ")[1];
	const auth = await getAuthByToken(token);
	const { email } = auth;
	const user = await getUserByEmail(email);
	if (user.role === "admin") {
		return true;
	} else {
		return false;
	}
};



module.exports = {
	login,
	logout,
	sendRecoveryCode,
	changePassword,
	loginAdmin,
	verifyAdmin,
};
