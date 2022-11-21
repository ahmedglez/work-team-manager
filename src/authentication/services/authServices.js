const {
	getUserByEmail,
	getUserByNickname,
} = require("../../database/crud/usersCrud");
const boom = require("@hapi/boom");
const { sign } = require("jsonwebtoken");
const dotenv = require("dotenv");
const { addAuth } = require("../lambdas/authFunctions");

dotenv.config({
	path: ".env",
});

const authByEmailOrUsername = async (req, res) => {
	const { email, username, password } = req.body;
	if (!email && !username) {
		throw boom.badRequest("Email or username is required");
		res.status(401).send("Invalid email or password");
		return;
	}
	if (!password) {
		throw boom.badRequest("Password is required");
		res.status(401).send("Invalid email or password");
		return;
	}

	const response = email
		? await getUserByEmail(email)
		: await getUserByNickname(username);
	if (response === undefined) {
		throw boom.badRequest("Invalid email or password");
		res.status(401).send("Invalid email or password");
	}
	const user = response.rows[0];
	if (user === undefined) {
		throw boom.badRequest("Invalid email or password");
		res.status(401).send("Invalid email or password");
	}

	const { id } = user;
	if (!user) {
		throw boom.unauthorized("Invalid email or password");
		res.status(401).send("Invalid email or password");
	}
	const isValidPassword = password === user.password;
	if (!isValidPassword) {
		throw boom.unauthorized("Invalid email or password");
		res.status(401).send("Invalid email or password");
	}
	const token = sign({ id: id }, process.env.SECRET_KEY, {
		expiresIn: "1h",
	});
	const auth = await addAuth(id, email, password, token);
	return auth;
};

module.exports = {
	authByEmailOrUsername,
};
