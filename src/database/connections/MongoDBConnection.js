const dotenv = require("dotenv");
dotenv.config({
	path: ".env",
});
const db = require("mongoose");
db.Promise = global.Promise;

db.connect(process.env.MONGODB_URL, {
})
	.then(() => {
		console.log("Connected to MongoDB");
	})
	.catch((err) => {
		console.log("Error connecting to MongoDB", err);
	});

module.exports = db;
