const express = require("express");
const multer = require("multer");
const router = express.Router();
const { authByEmailOrUsername } = require("../services/authServices");
const { error, success } = require("../../routes/response");

/* login with email or username and password */
router.post("/", (req, res) => {
	authByEmailOrUsername(req, res)
		.then((data) => {
			success(req, res, "Autorization granted", 200);
		})
		.catch((err) => {
			error(req, res, err.message, 500, err);
		});
});

module.exports = router;
