const boom = require("@hapi/boom");

const checkAuth = (req, res, next) => {
	const { authorization } = req.headers["authorization"];
	if (authorization === "1234") {
		next();
	} else {
		next(boom.unauthorized("Invalid token"));
	}
};

module.exports = { checkAuth };

// Path: src\middlewares\index.js
