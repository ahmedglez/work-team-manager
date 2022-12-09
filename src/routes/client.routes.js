const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const {
	getAllClientsHandler,
	getClientByIdHandler,
	getClientsbyTypeHandler,
	getClientsbyLocationHandler,
	getRecentClientsHandler,
	getClientsInLastSevenDaysHandler,
	createClientHandler,
	updateClientHandler,
	deleteClientHandler,
} = require("../services/clients.services.js");

router.get("/", checkAuth, checkRoles("admin"), getAllClientsHandler);
router.get("/:id", checkAuth, checkRoles("admin"), getClientByIdHandler);
router.get(
	"/byType/:type",
	checkAuth,
	checkRoles("admin"),
	getClientsbyTypeHandler
);
router.get(
	"/byLocation/:location",
	checkAuth,
	checkRoles("admin"),
	getClientsbyLocationHandler
);
router.get(
	"/recents",
	checkAuth,
	checkRoles("admin"),
	getRecentClientsHandler
);
router.get(
	"/last7Days",
	checkAuth,
	checkRoles("admin"),
	getClientsInLastSevenDaysHandler
);
router.post("/", checkAuth, checkRoles("admin"), createClientHandler);
router.put("/:id", checkAuth, checkRoles("admin"), updateClientHandler);
router.delete("/:id", checkAuth, checkRoles("superadmin"), deleteClientHandler);

module.exports = router;
