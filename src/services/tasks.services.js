const {
	createTask,
	getTasks,
	getTask,
	updateTask,
	deleteTask,
} = require("../database/crud/tasks.crud");

const getAllTasks = async (req, res, next) => {
	try {
		const tasks = await getTasks();
		res.status(200).json({
			data: tasks,
			message: "tasks listed",
		});
	} catch (error) {
		next(error);
	}
};

const getTaskById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const task = await getTask(id);
		res.status(200).json({
			data: task,
			message: "task retrieved",
		});
	} catch (error) {
		next(error);
	}
};

const getTasksByUser = async (req, res, next) => {
	const { user } = req.params;

	try {
		const tasks = await getTasksByUser(user);
		res.status(200).json({
			data: tasks,
			message: "tasks listed",
		});
	} catch (error) {
		next(error);
	}
};

const getTasksByStatus = async (req, res, next) => {
	const { status } = req.params;

	try {
		const tasks = await getTasksByStatus(status);
		res.status(200).json({
			data: tasks,
			message: "tasks listed",
		});
	} catch (error) {
		next(error);
	}
};

const getRecentTasks = async (req, res, next) => {
	try {
		const tasks = await getRecentTasks();
		res.status(200).json({
			data: tasks,
			message: "tasks listed",
		});
	} catch (error) {
		next(error);
	}
};

const createNewTask = async (req, res, next) => {
	const { body: task } = req;

	try {
		const createdTask = await createTask(task);
		res.status(201).json({
			data: createdTask,
			message: "task created",
		});
	} catch (error) {
		next(error);
	}
};

const updateTaskById = async (req, res, next) => {
	const { id } = req.params;
	const { body: task } = req;

	try {
		const updatedTask = await updateTask(id, task);
		res.status(200).json({
			data: updatedTask,
			message: "task updated",
		});
	} catch (error) {
		next(error);
	}
};

const deleteTaskById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const deletedTask = await deleteTask(id);
		res.status(200).json({
			data: deletedTask,
			message: "task deleted",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllTasks,
	getTaskById,
	getTasksByUser,
	getTasksByStatus,
	getRecentTasks,
	createNewTask,
	updateTaskById,
	deleteTaskById,
};
