const { getUserByEmail } = require("../database/crud/usersCrud");
const {
	isAlreadyLoggedIn,
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
	console.log("Is already logged", isAlreadyLogged);
	if (isAlreadyLogged) {
		throw boom.badRequest("User already logged in");
		res.status(401).send("User already logged in");
	}
};

module.exports = {
	isValidEmail,
	isValidPassword,
	isValidUser,
	isAlreadyLogged,
};
