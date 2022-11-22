const dotenv = require("dotenv");
dotenv.config({
	path: ".env",
});
const { Client } = require("pg");
const client = new Client({
	user: process.env.PGUSER,
	host: process.env.PGHOST,
	database: process.env.PGDATABASE,
	password: process.env.PGPASSWORD,
	port: process.env.PGPORT,
});
client
	.connect()
	.then(() => {
		console.log("Connected to PostgreSQL");
	})
	.catch((err) => {
		console.log("Error connecting to PostgreSQL", err);
	});

module.exports = client;
