const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const ClientServices = require("../services/clients.services.js");
const service = ClientServices();

router.get("/", checkAuth, checkRoles("admin"), service.getAllClientsHandler);
router.get(
	"/:id",
	checkAuth,
	checkRoles("admin"),
	service.getClientByIdHandler
);
router.get(
	"/byType/:type",
	checkAuth,
	checkRoles("admin"),
	service.getClientsbyTypeHandler
);
router.get(
	"/byLocation/:location",
	checkAuth,
	checkRoles("admin"),
	service.getClientsbyLocationHandler
);
router.get(
	"/recents",
	checkAuth,
	checkRoles("admin"),
	service.getRecentClientsHandler
);
router.get(
	"/last7Days",
	checkAuth,
	checkRoles("admin"),
	service.getClientsInLastSevenDaysHandler
);
router.post("/", checkAuth, checkRoles("admin"), createClientHandler);
router.put("/:id", checkAuth, checkRoles("admin"), updateClientHandler);
router.delete("/:id", checkAuth, checkRoles("superadmin"), deleteClientHandler);

module.exports = router;
