require("dotenv").config({ path: __dirname + "/../../.env" });

const config = {
	development: {
		database: {
			localDB: process.env.MONGODB_LOCAL_URL,
			host: process.env.MONGOHOST,
			password: process.env.MONGOPASSWORD,
			user: process.env.MONGOUSER,
			port: process.env.MONGOPORT,
		},
		port: process.env.SERVER_PORT,

		api_key: process.env.API_KEY,
		email_host: process.env.EMAIL_HOST,
		email_pass: process.env.EMAIL_PASSWORD,
		email_user: process.env.EMAIL_USER,
		email_contact: process.env.EMAIL_CONTACT,
	},
};

module.exports = { config };
