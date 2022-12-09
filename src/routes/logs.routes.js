const express = require("express");
const router = express.Router();
const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const {
	getAllLogsHandler,
	getLogsByUserHandler,
	getLogsByActionHandler,
	getLogsByDateHandler,
	getRecetLogsHandler,
	getLogsInLastSevenDaysHandler,
	createLogHandler,
} = require("../services/logs.services");

router.get("/", checkAuth, checkRoles(["superadmin"]), getAllLogsHandler);
router.get(
	"/byUser/:user",
	checkAuth,
	checkRoles(["superadmin"]),
	getLogsByUserHandler
);
router.get(
	"/byAction/:action",
	checkAuth,
	checkRoles(["superadmin"]),
	getLogsByActionHandler
);
router.get(
	"/byDate",
	checkAuth,
	checkRoles(["superadmin"]),
	getLogsByDateHandler
);
router.get(
	"/recent",
	checkAuth,
	checkRoles(["superadmin"]),
	getRecetLogsHandler
);
router.get(
	"/last7Days",
	checkAuth,
	checkRoles(["superadmin"]),
	getLogsInLastSevenDaysHandler
);
router.post("/", checkAuth, checkRoles(["superadmin"]), createLogHandler);

module.exports = router;
