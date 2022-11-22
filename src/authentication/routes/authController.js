const express = require("express");
const multer = require("multer");
const router = express.Router();
const { authByEmail, deleteToken } = require("../services/authServices");
const { error, success } = require("../../routes/response");

/* login with email o and password */
router.post("/login/", (req, res) => {
	if (!req.body.email && !req.body.password) {
		return res.json({ error: "No credentials sent!" });
	}
	authByEmail(req, res)
		.then((data) => {
			success(req, res, "Autorization granted", data, 200);
		})
		.catch((err) => {
			error(req, res, err.message, err.output.payload.statusCode, err);
		});
});

router.post("/logout/", (req, res) => {
	const { token } = req.body;
	if (!token) {
		return res.status(400).json({ error: "No token sent!" });
	}
	deleteToken(token)
		.then((data) => {
			success(req, res, "Token deleted", null, 200);
		})
		.catch((err) => {
			error(req, res, err.message, null, err);
		});
});

module.exports = router;
