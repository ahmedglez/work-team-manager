const express = require("express");
const router = express.Router();

const { checkAuth, checkRoles } = require("../middlewares/auth.handler");

const {
	getAllTasks,
	getTaskById,
	getTasksByUser,
	getTasksByStatus,
	getRecentTasks,
	createNewTask,
	updateTaskById,
	deleteTaskById,
} = require("../services/tasks.services");

router.get("/", checkAuth, checkRoles(["admin"]), getAllTasks);
router.get("/:id", checkAuth, checkRoles(["user"]), getTaskById);
router.get("/byUser", checkAuth, checkRoles(["user"]), getTasksByUser);
router.get("/byStatus", checkAuth, checkRoles(["user"]), getTasksByStatus);
router.get("/getRecent/", checkAuth, checkRoles(["user"]), getRecentTasks);
router.post("/", checkAuth, checkRoles(["admin"]), createNewTask);
router.put("/:id", checkAuth, checkRoles(["admin"]), updateTaskById);
router.delete("/:id", checkAuth, checkRoles(["admin"]), deleteTaskById);

module.exports = router;
