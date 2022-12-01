const express = require("express");
const passport = require("passport");
const router = express.Router();
const LocalStrategy = require("../utils/auth/strategies/local.strategy");
const { signToken } = require("../utils/auth/tokens/token-sign");
passport.use(LocalStrategy);

router.post(
	"/login",
	passport.authenticate("local", { session: false }),
	async (req, res, next) => {
		try {
			const user = req.user;
			const payload = {
				sub: user.id,
				fullname: user.fullname,
				email: user.email,
				roles: user.roles,
			};
			const token = signToken(payload, { expiresIn: "1h" });
			res.status(200).send({ user, token });
		} catch (error) {
			next(error);
		}
	}
);

module.exports = router;
