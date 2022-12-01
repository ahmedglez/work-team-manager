const passport = require("passport");
const checkAuth = (req, res, next) => {
	const auth = passport.authenticate("jwt", { session: false });
	auth(req, res, next);
};

module.exports = { checkAuth };

