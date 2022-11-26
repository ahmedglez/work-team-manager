const express = require("express");
const router = express.Router();
const { error, success } = require("../../routes/response");
const { generateLog } = require("../../middlewares/generateLog");
const { loginAdmin, verifyAdmin } = require("../../authentication/services");
const {
	getAllLogs,
	getLogsByUser,
	getLogsByAction,
	getLogsByDate,
	getRecetLogs,
	getLogsInLastSevenDays,
	createLog,
} = require("../../logs/userLogs");

router.get("logs/", (req, res) => {
	if (verifyAdmin(req, res)) {
		getAllLogs()
			.then((data) => {
				success(req, res, "Logs found", data, 200);
				generateLog("admin", "consult logs", "Logs found");
			})
			.catch((err) => {
				error(req, res, err.message, null, err);
				generateLog("admin", "consult logs", err.message);
			});
	}
});

router.get("logs/:user", (req, res) => {
	if (verifyAdmin(req, res)) {
		const { user } = req.params;
		getLogsByUser(user)
			.then((data) => {
				success(req, res, "Logs found", data, 200);
				generateLog("admin", "consult logs", "Logs found");
			})

			.catch((err) => {
				error(req, res, err.message, null, err);
				generateLog("admin", "consult logs", err.message);
			});
	}
});

router.get("logs/:action", (req, res) => {
	if (verifyAdmin(req, res)) {
		const { action } = req.params;
		getLogsByAction(action)
			.then((data) => {
				success(req, res, "Logs found", data, 200);
				generateLog("admin", "consult logs", "Logs found");
			})
			.catch((err) => {
				error(req, res, err.message, null, err);
				generateLog("admin", "consult logs", err.message);
			});
	}
});

router.get("logs/:date", (req, res) => {
	if (verifyAdmin(req, res)) {
		const { date } = req.params;
		getLogsByDate(date)
			.then((data) => {
				success(req, res, "Logs found", data, 200);
				generateLog("admin", "consult logs", "Logs found");
			})

			.catch((err) => {
				error(req, res, err.message, null, err);
				generateLog("admin", "consult logs", err.message);
			});
	}
});

router.get("logs/recent", (req, res) => {
	if (verifyAdmin(req, res)) {
		getRecetLogs()
			.then((data) => {
				success(req, res, "Logs found", data, 200);
				generateLog("admin", "consult logs", "Logs found");
			})
			.catch((err) => {
				error(req, res, err.message, null, err);
				generateLog("admin", "consult logs", err.message);
			});
	}
});

router.get("logs/lastSevenDays", (req, res) => {
	if (verifyAdmin(req, res)) {
		getLogsInLastSevenDays()
			.then((data) => {
				success(req, res, "Logs found", data, 200);
				generateLog("admin", "consult logs", "Logs found");
			})
			.catch((err) => {
				error(req, res, err.message, null, err);
				generateLog("admin", "consult logs", err.message);
			});
	}
});

module.exports = router;
