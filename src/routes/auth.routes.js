const express = require("express");
const passport = require("passport");
const { signToken } = require("../utils/auth/tokens/token-sign");
const router = express.Router();

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
			const token = signToken(payload, { expiresIn: "15 minutes" });
			res.status(200).send({ user, token });
		} catch (error) {
			console.log(" Error on Auth ", error);
			next(error);
		}
	}
);

module.exports = router;
