const express = require("express");
const multer = require("multer");
const router = express.Router();
const { authByEmail } = require("../services/authServices");
const { error, success } = require("../../routes/response");

/* login with email o and password */
router.get("/", (req, res) => {
	if (!req.body.email && !req.body.password) {
		return res.json({ error: "No credentials sent!" });
	}
	authByEmail(req, res)
		.then((data) => {
			success(req, res, "Autorization granted", 200);
		})
		.catch((err) => {
			error(req, res, err.message, err.output.payload.statusCode, err);
		});
});

module.exports = router;
