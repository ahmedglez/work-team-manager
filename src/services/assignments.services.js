const { updateUser, getUser } = require("../database/crud/users.crud");
const { updateTask, getTask } = require("../database/crud/tasks.crud");

const assingTaskToUser = async (req, res, next) => {
	const { taskID, userID } = req.body;
	const user = await getUser(userID);
	const task = await getTask(taskID);
	try {
		await updateUser(userID, {
			...user,
			assignedTasks: user.assignedTasks.push(taskID),
		});
		await updateTask(taskID, {
			...task,
			assignedTo: task.assignedTo.push(userID),
		});
	} catch (error) {
		next(error);
	}
};

const desassingTaskToUser = async (req, res, next) => {
	const { taskID, userID } = req.body;
	const user = await getUser(userID);
	const task = await getTask(taskID);
	try {
		await updateUser(userID, {
			...user,
			assignedTasks: user.assignedTasks.filter((task) => task !== taskID),
		});
		await updateTask(taskID, {
			...task,
			assignedTo: task.assignedTo.filter((user) => user !== userID),
		});
	} catch (error) {
		next(error);
	}
};

module.exports = { assingTaskToUser, desassingTaskToUser };
