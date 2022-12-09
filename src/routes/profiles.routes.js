const express = require("express");
const passport = require("passport");
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

router.get("/me", checkAuth, checkRoles("user", "admin"), (req, res) => {
	res.status(200).send(req.user);
});
router.get("/my-tasks", checkAuth, checkRoles("user"), getTasksByUserHandler);

module.exports = router;
