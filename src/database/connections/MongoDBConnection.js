const dotenv = require("dotenv");
dotenv.config({
	path: ".env",
});
const db = require("mongoose");
db.Promise = global.Promise;

db.connect(process.env.MONGODB_URL, {
	useNewUrlParser: true,
});
console.log("[db] Conectada con exito!!");

module.exports = db;
