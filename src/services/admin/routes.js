const express = require("express");
const router = express.Router();
const { error, success } = require("../../routes/response");
const { generateLog } = require("../../middlewares/generateLog");
const { loginAdmin } = require("../../authentication/services");
const LogsController = require("./logsController");

const routes = function (server) {
	server.use(LogsController);
};

module.exports = routes;
