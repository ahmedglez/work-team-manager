const express = require("express");
const multer = require("multer");
const router = express.Router();
const { authByEmail } = require("../services/authServices");
const response = require("../../routes/response");

router.post("/", (req, res) => {
	authByEmail(req, res)
		.then((data) => {
			response.success(req, res, data, 200);
		})
		.catch((err) => {
			response.error(req, res, err.message, 500, err);
		});
});

module.exports = router;
