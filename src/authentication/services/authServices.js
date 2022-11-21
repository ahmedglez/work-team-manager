const { getUserByEmail } = require("../../database/crud/usersCrud");
const boom = require("@hapi/boom");
const { sign } = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
	addAuth,
	deleteAuthByToken,
	isAlreadyLoggedIn,
} = require("../lambdas/authFunctions");

dotenv.config({
	path: ".env",
});

const authByEmail = async (req, res) => {
	const { email, password } = req.body;
	if (!email) {
		throw boom.badRequest("Email is required");
		res.status(401).send("Invalid email or password");
	}

	if (!password) {
		throw boom.badRequest("Password is required");
		res.status(401).send("Invalid email or password");
	}

	const response = await getUserByEmail(email);

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
	const isValidPassword = password === user.password;
	if (!isValidPassword) {
		throw boom.unauthorized("Invalid email or password");
		res.status(401).send("Invalid email or password");
	}

	const isAlreadyLogged = await isAlreadyLoggedIn(email);
	console.log("Is already logged", isAlreadyLogged);
	if (isAlreadyLogged) {
		throw boom.badRequest("User already logged in");
		res.status(401).send("User already logged in");
	}
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
