require("dotenv").config();

const config = {
	development: {
		port: process.env.SERVER_PORT,
		dbURL: process.env.MONGODB_URL,
		api_key: process.env.API_KEY,
		email_host: process.env.EMAIL_HOST,
		email_pass: process.env.EMAIL_PASSWORD,
		email_user: process.env.EMAIL_USER,
	},
};

module.exports = { config };
