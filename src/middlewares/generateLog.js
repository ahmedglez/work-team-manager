const { createLog } = require("../logs/userLogs");

const generateLog = (user, action, message) => {
	createLog(user, action, message);
};

module.exports = { generateLog };
