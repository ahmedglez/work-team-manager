const TaskModel = require("../models/task.model");

const createTask = async (task) => {
	const newTask = new TaskModel(task);
	return await newTask.save();
};

const getTasks = async () => {
	return await TaskModel.find({});
};

const getTask = async (id) => {
	return await TaskModel.findById(id);
};

const updateTask = async (id, task) => {
	return await TaskModel.findByIdAndUpdate(id, task);
};

const deleteTask = async (id) => {
	return await TaskModel.findByIdAndDelete(id);
};

module.exports = {
	createTask,
	getTasks,
	getTask,
	updateTask,
	deleteTask,
};
