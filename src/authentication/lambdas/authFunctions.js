const model = require("../model/authSchema");

const addAuth = async (userId, email, password, token) => {
	const auth = new model({
		userId,
		email,
		password,
		token,
	});
	return auth.save();
};

module.exports = {
	addAuth,
};
