const express = require("express");
const passport = require("passport");
const { signToken } = require("../utils/auth/tokens/token-sign");
const { checkAuth, checkRoles } = require("../middlewares/auth.handler");
const AuthServices = require("../services/auth.services");
const service = AuthServices();

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
			const refreshToken = signToken(payload, { expiresIn: "1 day" });
			res.status(200).send({ token, refreshToken });
		} catch (error) {
			console.log(" Error on Auth ", error);
			next(error);
		}
	}
);

router.post("/recover-password", service.recoverPassword);

router.post("/verify-recovery-code", service.verifyRecoveryCode);

router.post("/reset-password", checkAuth, service.resetPassword);

router.post(
	"/refresh-token",
	checkAuth,
	checkRoles("user"),
	service.refreshToken
);

module.exports = router;
