const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const {
	getAllTasksHandler,
	getTaskByIdHandler,
	getTasksByUserHandler,
	getTasksByStatusHandler,
	getRecentTasksHandler,
	createNewTaskHandler,
	updateTaskByIdHandler,
	deleteTaskByIdHandler,
} = require("../services/tasks.services");

router.get("/", checkAuth, checkRoles("admin"), getAllTasksHandler);
router.get("/:id", checkAuth, checkRoles("user"), getTaskByIdHandler);
router.get("/byUser", checkAuth, checkRoles("user"), getTasksByUserHandler);
router.get("/byStatus", checkAuth, checkRoles("user"), getTasksByStatusHandler);
router.get("/getRecent/", checkAuth, checkRoles("user"), getRecentTasksHandler);
router.post("/", checkAuth, checkRoles("admin"), createNewTaskHandler);
router.put("/:id", checkAuth, checkRoles("admin"), updateTaskByIdHandler);
router.delete("/:id", checkAuth, checkRoles("admin"), deleteTaskByIdHandler);

module.exports = router;
