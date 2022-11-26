const express = require("express");
const authenticationRoutes = require("../authentication/routes/authController");
const administratorRoutes = require("../services/admin/routes");

const routes = function (server) {
	server.use(authenticationRoutes);
	server.use(administratorRoutes(server));
};

module.exports = routes;
