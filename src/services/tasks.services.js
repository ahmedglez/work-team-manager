const {
	createTask,
	getTasks,
	getTask,
	updateTask,
	deleteTask,
} = require("../database/crud/tasks.crud");
const boom = require("@hapi/boom");

const { getUserByEmail, getUser } = require("../database/crud/users.crud");

const TaskServices = () => {
	const getAllTasksHandler = async (req, res, next) => {
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

	const getTaskByIdHandler = async (req, res, next) => {
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

	const getTasksByUserHandler = async (req, res, next) => {
		const user = req.user;
		try {
			const user2 = await getUserByEmail(user.email);
			const tasks = user2.assignedTasks;
			res.status(200).json({
				data: tasks,
				message: "tasks listed",
			});
		} catch (error) {
			const err = boom.badImplementation("Error retrieving tasks");
			res.status(err.output.statusCode).json(err.output.payload);
		}
	};

	const getTasksByStatusHandler = async (req, res, next) => {
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

	const getRecentTasksHandler = async (req, res, next) => {
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

	const createNewTaskHandler = async (req, res, next) => {
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

	const updateTaskByIdHandler = async (req, res, next) => {
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

	const deleteTaskByIdHandler = async (req, res, next) => {
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

	return {
		getAllTasksHandler,
		getTaskByIdHandler,
		getTasksByUserHandler,
		getTasksByStatusHandler,
		getRecentTasksHandler,
		createNewTaskHandler,
		updateTaskByIdHandler,
		deleteTaskByIdHandler,
	};
};

module.exports = TaskServices;
