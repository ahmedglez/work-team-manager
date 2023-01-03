const {
	getAllLogs,
	getLogsByUser,
	getLogsByAction,
	getLogsByDate,
	getRecetLogs,
	getLogsInLastSevenDays,
	createLog,
} = require("../database/crud/logs.crud");

const LogServices = () => {
	const getAllLogsHandler = async (req, res, next) => {
		try {
			const logs = await getAllLogs();
			res.status(200).json({
				data: logs,
				message: "logs listed",
			});
		} catch (error) {
			next(error);
		}
	};

	const getLogsByUserHandler = async (req, res, next) => {
		const { user } = req.params;

		try {
			const logs = await getLogsByUser(user);
			res.status(200).json({
				data: logs,
				message: "logs listed",
			});
		} catch (error) {
			next(error);
		}
	};

	const getLogsByActionHandler = async (req, res, next) => {
		const { action } = req.params;

		try {
			const logs = await getLogsByAction(action);
			res.status(200).json({
				data: logs,
				message: "logs listed",
			});
		} catch (error) {
			next(error);
		}
	};

	const getLogsByDateHandler = async (req, res, next) => {
		const { date } = req.params;

		try {
			const logs = await getLogsByDate(date);
			res.status(200).json({
				data: logs,
				message: "logs listed",
			});
		} catch (error) {
			next(error);
		}
	};

	const getRecetLogsHandler = async (req, res, next) => {
		try {
			const logs = await getRecetLogs();
			res.status(200).json({
				data: logs,
				message: "logs listed",
			});
		} catch (error) {
			next(error);
		}
	};

	const getLogsInLastSevenDaysHandler = async (req, res, next) => {
		try {
			const logs = await getLogsInLastSevenDays();
			res.status(200).json({
				data: logs,
				message: "logs listed",
			});
		} catch (error) {
			next(error);
		}
	};

	const createLogHandler = async (req, res, next) => {
		const { user, action, date } = req.body;
		try {
			const createdLog = await createLog(user, action, date);
			res.status(201).json({
				data: createdLog,
				message: "log created",
			});
		} catch (error) {
			next(error);
		}
	};

	return {
		getAllLogsHandler,
		getLogsByUserHandler,
		getLogsByActionHandler,
		getLogsByDateHandler,
		getRecetLogsHandler,
		getLogsInLastSevenDaysHandler,
		createLogHandler,
	};
};

module.exports = LogServices;
