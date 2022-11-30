const LogModel = require("../../schemas/log.schema");

const getAllLogs = async () => {
	const logs = await LogModel.find();
	return logs;
};

const getLogsByUser = async (user) => {
	const logs = await LogModel.find({ user: user });
	return logs;
};

const getLogsByAction = async (action) => {
	const logs = await LogModel.find({ action: action });
	return logs;
};

const getLogsByDate = async (date) => {
	const logs = await LogModel.find({ date: date });
	return logs;
};

const getRecetLogs = async () => {
	const logs = await LogModel.find().sort({ date: -1 }).limit(5);
	return logs;
};

const getLogsInLastSevenDays = async () => {
	const logs = await LogModel.find({
		date: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
	});
	return logs;
};

const createLog = async (user, action, message) => {
	const log = new LogModel({
		user: user,
		action: action,
		message: message,
	});
	await log.save();
};

module.exports = {
	getAllLogs,
	getLogsByUser,
	getLogsByAction,
	getLogsByDate,
	getRecetLogs,
	getLogsInLastSevenDays,
	createLog,
};
