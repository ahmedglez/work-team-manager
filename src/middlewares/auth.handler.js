const passport = require("passport");
const boom = require("@hapi/boom");

const checkAuth = (req, res, next) => {
	const auth = passport.authenticate("jwt", { session: false });
	auth(req, res, next);
};

const checkRoles = (...roles) => {
	return (req, res, next) => {
		const { user } = req;
		const user_roles_array = Object.values(user.roles);
		const isRolesValid = roles.every((role) => user_roles_array.includes(role));
		if (!isRolesValid) {
			const error = boom.unauthorized("You don't have permission to access");
			res.status(error.output.statusCode).json(error.output.payload);
		}
		next();
	};
};

module.exports = {
	checkAuth,
	checkRoles,
};
