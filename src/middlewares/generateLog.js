const { createLog } = require("../logs/userLogs");

const generateLog = (user, action, message, next) => {
	createLog(user, action, message);
	next();
};

module.exports = { generateLog };
