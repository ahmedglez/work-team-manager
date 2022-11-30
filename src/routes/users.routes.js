const dotenv = require("dotenv");
dotenv.config({
	path: ".env",
});

const express = require("express");
const router = express.Router();

const { checkAuth } = require("../middlewares/auth.handler");
