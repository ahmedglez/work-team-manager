const boom = require("@hapi/boom");
const { config } = require("../config/enviroment.config");
const checkAuth = (req, res, next) => {
	const authorization = req.headers["authorization"];
	console.log(authorization);
	if (authorization === config.development.api_key) {
		console.log("Authorized");
		console.log(next);
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
