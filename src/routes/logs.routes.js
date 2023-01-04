const express = require("express");
const router = express.Router();
const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const LogServices = require("../services/logs.services");
const service = LogServices();

router.get("/", checkAuth, checkRoles("superadmin"), service.getAllLogsHandler);
router.get(
	"/byUser/:user",
	checkAuth,
	checkRoles("superadmin"),
	service.getLogsByUserHandler
);
router.get(
	"/byAction/:action",
	checkAuth,
	checkRoles("superadmin"),
	service.getLogsByActionHandler
);
router.get(
	"/byDate",
	checkAuth,
	checkRoles("superadmin"),
	service.getLogsByDateHandler
);
router.get(
	"/recent",
	checkAuth,
	checkRoles("superadmin"),
	service.getRecetLogsHandler
);
router.get(
	"/last7Days",
	checkAuth,
	checkRoles("superadmin"),
	service.getLogsInLastSevenDaysHandler
);
router.post("/", checkAuth, checkRoles("superadmin"), service.createLogHandler);

module.exports = router;
