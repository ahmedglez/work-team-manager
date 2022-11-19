const { getUserByEmail } = require("../../database/crud/usersCrud");
const boom = require("@hapi/boom");
const { sign } = require("jsonwebtoken");
const dotenv = require("dotenv");
const { addAuth } = require("../lambdas/authFunctions");
dotenv.config({
	path: ".env",
});

const authByEmail = async (req, res) => {
	const { email, password } = req.body;
	const response = await getUserByEmail(email);
	const user = response.rows[0];
	console.log(user);
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
	authByEmail,
};
