const boom = require("@hapi/boom");
const { config } = require("../config/enviroment.config");
const checkAuth = (req, res, next) => {
	const authorization = req.headers["authorization"];
	if (authorization === config.development.api_key) {
		next();
	} else {
		next(boom.unauthorized("Invalid token"));
		res.status(401).json({
			message: "Invalid token",
		});
	}
};

module.exports = { checkAuth };

// Path: src\middlewares\index.js
