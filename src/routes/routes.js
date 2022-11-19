const express = require("express");
const authentication = require("../authentication/routes/authController");

const routes = function (server) {
	server.use("/auth", authentication);
};

module.exports = routes;
