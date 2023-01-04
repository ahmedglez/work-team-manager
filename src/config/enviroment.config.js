require("dotenv").config({ path: __dirname + "/../../.env" })	

const config = {
	development: {
		port: process.env.SERVER_PORT,
		localDB: process.env.MONGODB_LOCAL_URL,
		dbURL: process.env.MONGODB_URL,
		dbName:process.env.MONGODB_NAME,
		api_key: process.env.API_KEY,
		email_host: process.env.EMAIL_HOST,
		email_pass: process.env.EMAIL_PASSWORD,
		email_user: process.env.EMAIL_USER,
	},
};

module.exports = { config };
