const express = require("express");
const multer = require("multer");
const router = express.Router();
const {
	login,
	logout,
	sendRecoveryCode,
} = require("../services/authServices");
const { error, success } = require("../../routes/response");

/* login with email o and password */
router.post("/login/", (req, res) => {
	if (!req.body.email && !req.body.password) {
		return res.json({ error: "No credentials sent!" });
	}
	login(req, res)
		.then((data) => {
			success(req, res, "Autorization granted", data, 200);
		})
		.catch((err) => {
			error(req, res, err.message, err.output.payload.statusCode, err);
		});
});

router.post("/logout/", (req, res) => {
	const token = req.headers.authorization.split(" ")[1];
	if (!token) {
		return res.status(400).json({ error: "No token sent!" });
	}
	logout(req, res)
		.then((data) => {
			success(req, res, "Token deleted", null, 200);
		})
		.catch((err) => {
			error(req, res, err.message, null, err);
		});
});

router.post("/recovery/", (req, res) => {
	const { email } = req.body;
	if (!email) {
		return res.status(400).json({ error: "No email sent!" });
	}
	sendRecoveryCode(req, res);
});

module.exports = router;
