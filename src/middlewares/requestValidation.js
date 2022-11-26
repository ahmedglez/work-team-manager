const { getUserByEmail } = require("../database/crud/usersCrud");
const {
	isAlreadyLoggedIn,
	getAuthByToken,
	changePassword,
} = require("../authentication/lambdas/authFunctions");
const boom = require("@hapi/boom");

const isValidEmail = (req, res) => {
	const { email } = req.body;
	if (!email) {
		throw boom.badRequest("Email is required");
		res.status(401).send("Invalid email or password");
	}
};

const isValidPassword = (req, res) => {
	const { password } = req.body;
	if (!password) {
		throw boom.badRequest("Password is required");
		res.status(401).send("Invalid email or password");
	}
};

const isValidRecoveryCode = async (req, res) => {
	const { code } = req.body;
	if (!code) {
		throw boom.badRequest("Recovery code is required");
		res.status(401).send("Invalid recovery code");
	}
};

const isValidToken = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	if (!token) {
		throw boom.badRequest("Token is required");
		res.status(401).send("Invalid token");
	}
};

const isValidUser = async (req, res) => {
	const { email, password } = req.body;
	const response = await getUserByEmail(email);
	if (response === undefined) {
		throw boom.badRequest("User not found");
		res.status(401).send("User not found");
	}
	const user = response.rows[0];
	if (user === undefined) {
		throw boom.badRequest("User not found");
		res.status(401).send("User not found");
	}
	const isValidPassword = password === user.password;
	if (!isValidPassword) {
		throw boom.unauthorized("Invalid email or password");
		res.status(401).send("Invalid email or password");
	}
};

const isAlreadyLogged = async (req, res) => {
	const { email } = req.body;
	const isAlreadyLogged = await isAlreadyLoggedIn(email);
	if (isAlreadyLogged) {
		throw boom.badRequest("User already logged in");
		res.status(401).send("User already logged in");
	}
	return isAlreadyLogged;
};



const validateToken = async (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	const auth = await getAuthByToken(token);
	if (auth === null) {
		throw boom.unauthorized("Invalid token");
	}
};

module.exports = {
	isValidEmail,
	isValidPassword,
	isValidUser,
	isAlreadyLogged,
	isValidRecoveryCode,
	isValidToken,
	validateToken,
};
