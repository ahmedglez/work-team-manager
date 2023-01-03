const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const TaskServices = require("../services/tasks.services");
const service = TaskServices();

router.get("/", checkAuth, checkRoles("admin"), service.getAllTasksHandler);
router.get("/:id", checkAuth, checkRoles("user"), service.getTaskByIdHandler);
router.get(
	"/byUser",
	checkAuth,
	checkRoles("user"),
	service.getTasksByUserHandler
);
router.get(
	"/byStatus",
	checkAuth,
	checkRoles("user"),
	service.getTasksByStatusHandler
);
router.get(
	"/getRecent/",
	checkAuth,
	checkRoles("user"),
	service.getRecentTasksHandler
);
router.post("/", checkAuth, checkRoles("admin"), service.createNewTaskHandler);
router.put(
	"/:id",
	checkAuth,
	checkRoles("admin"),
	service.updateTaskByIdHandler
);
router.delete(
	"/:id",
	checkAuth,
	checkRoles("admin"),
	service.deleteTaskByIdHandler
);

module.exports = router;
