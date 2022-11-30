const dotenv = require("dotenv");
dotenv.config({
	path: ".env",
});

const config = {
	development: {
		port: process.env.SERVER_PORT,
		dbURL: process.env.MONGODB_URL,
		api_key: process.env.API_KEY,
		email_host: process.env.EMAIL_HOST,
		email_user: process.env.EMAIL_USER,
		email_pass: process.env.EMAIL_PASS,
		email_port: process.env.EMAIL_PORT,
	},
	production: {
		port: process.env.PORT,
		dbURL: process.env.MONGODB_URL,
		api_key: process.env.API_KEY,
		email_host: process.env.EMAIL_HOST,
		email_user: process.env.EMAIL_USER,
		email_pass: process.env.EMAIL_PASS,
		email_port: process.env.EMAIL_PORT,
	},
};

module.exports = { config };
