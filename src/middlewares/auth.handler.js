const passport = require("passport");
const { verifyToken } = require("../utils/auth/tokens/token-verify");
const boom = require("@hapi/boom");

const checkAuth = (req, res, next) => {
	const auth = passport.authenticate("jwt", { session: false });
	auth(req, res, next);
};

const checkRoles = (...roles) => {
	return (req, res, next) => {
		const payload = verifyToken(
			req.headers.authorization.split(" ")[1]
		);
		if (!payload) {
			const error = boom.unauthorized("Token is not valid");
			next(error);
		}
		const { roles: userRoles } = payload;
		const hasRole = roles.some((role) => userRoles.includes(role));
		if (hasRole) {
			next();
		}
		else {
			next(boom.unauthorized("You don't have permission to access"));
		}
		
	};
};

module.exports = {
	checkAuth,
	checkRoles,
};
