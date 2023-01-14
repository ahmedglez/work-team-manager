const { config } = require("../../config/enviroment.config");
const db = require("mongoose");
db.Promise = global.Promise;
console.log("Connecting to MongoDB");
console.log(config.development.dbURL);
db.connect(config.development.dbURL, {})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log("Error connecting to MongoDB", err.message);
	});

module.exports = db;
