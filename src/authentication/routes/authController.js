const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
	login,
	logout,
	sendRecoveryCode,
	changePassword,
} = require("../services/authServices");
const { error, success } = require("../../routes/response");
const { generateLog } = require("../../middlewares/generateLog");

/* login with email o and password */
router.post("/login/", (req, res) => {
	if (!req.body.email && !req.body.password) {
		generateLog("undentify", "login", "No credentials sent!");
		return res.json({ error: "No credentials sent!" });
	}
	login(req, res)
		.then((data) => {
			success(req, res, "Autorization granted", data, 200);
			generateLog(req.body.email, "login", "login success");
		})
		.catch((err) => {
			error(req, res, err.message, err.output.payload.statusCode, err);
			generateLog(req.body.email, "login", err.message);
		});
});

router.post("/logout/", (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	if (!token) {
		return res.status(400).json({ error: "No token sent!" });
		generateLog("undentify", "logout", "No token sent!");
	}
	logout(req, res)
		.then((data) => {
			success(req, res, "Token deleted", null, 200);
			generateLog(token, "logout", "logout success");
		})
		.catch((err) => {
			error(req, res, err.message, null, err);
		});
});

router.post("/recovery/", (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.status(400).json({ error: "No email sent!" });
		generateLog("undentify", "recovery", "No email sent!");
	}
	sendRecoveryCode(req, res)
		.then((data) => {
			success(req, res, "Recovery code sent", data, 200);
			generateLog(email, "recovery", "recovery code sent");
		})
		.catch((err) => {
			error(req, res, err.message, null, err);
			generateLog(email, "recovery", err.message);
		});
});

router.post("/recovery/newPassword", (req, res) => {
	const { email, password, recoveryCode } = req.body;
	if (!email && !password && !recoveryCode) {
		return res.status(400).json({ error: "No credentials sent!" });
		generateLog("undentify", "recovery", "No credentials sent!");
	}
	changePassword(req, res)
		.then((data) => {
			success(req, res, "Password changed", data, 200);
			generateLog(email, "recovery", "password changed");
		})
		.catch((err) => {
			error(req, res, err.message, null, err);
			generateLog(email, "recovery", err.message);
		});
});

module.exports = router;
