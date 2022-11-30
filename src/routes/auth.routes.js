const express = require("express");
const passport = require("passport");
const router = express.Router();

passport.use(require("../utils/auth/strategies/local.strategy"));

router.post(
	"/login",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			res.status(200).json({
				message: "Logged in Successfully",
				user: req.user,
			});
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
