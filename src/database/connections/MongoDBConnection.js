const { config } = require("../../config/enviroment.config");
const db = require("mongoose");
db.Promise = global.Promise;
const { host, password, port, user } = config.development.database;
const MONGO_URL = `mongodb://${user}:${password}@${host}:${port}`;
db.connect(MONGO_URL, {})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log("Error connecting to MongoDB", err.message);
	});

module.exports = db;
