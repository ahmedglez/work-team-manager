const passport = require("passport");
const boom = require("@hapi/boom");

const checkAuth = (req, res, next) => {
	const auth = passport.authenticate("jwt", { session: false });
	auth(req, res, next);
};

const checkRoles = (...roles) => {
	return (req, res, next) => {
		const user = req.user;
		if (roles.includes(user.role)) {
			next();
		} else {
			const error = boom.unauthorized(
				"You are not authorized to perform this action"
			);
			next(res.status(error.output.statusCode).json(error.output.payload));
		}
	};
};

module.exports = {
	checkAuth,
	checkRoles,
};
