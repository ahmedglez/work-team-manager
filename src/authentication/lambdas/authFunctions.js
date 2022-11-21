const model = require("../model/authSchema");

const addAuth = async (userId, email, password, token) => {
	const auth = new model({
		userId,
		email,
		password,
		token,
		loggedIn: true,
	});
	auth.save();
};

const getAllLogs = async () => {
	const response = await model.find();
	return response;
};

const getAuthById = async (id) => {
	const response = await model.findById({ _id: id });
	return response;
};

const getAuthByToken = async (token) => {
	const response = await model.findOne({ token: token });
	return response;
};

const getAuthByEmail = async (email) => {
	const response = await model.findOne({ email: email });
	return response;
};

const updateAuth = async (id, data) => {
	const response = await model.findByIdAndUpdate(
		{
			_id: id,
		},
		data,
		{
			new: true,
		}
	);
	return response;
};

const deleteAuthByToken = async (token) => {
	const response = await model.findOne.deleteOne({ token: token });
	return response;
};

const isAlreadyLoggedIn = async (email) => {
	const response = await model.findOne({ email: email });
	if (response === null) {
		return false;
	}
	return response.loggedIn;
};

const loggedOut = async (id) => {
	const response = await model.findByIdAndUpdate(
		{
			_id: id,
		},
		{
			loggedIn: false,
		},
		{
			new: true,
		}
	);
	return response;
};

const deleteAuth = async (id) => {
	const response = await model.findByIdAndDelete(id);
	return response;
};

module.exports = {
	addAuth,
	deleteAuth,
	getAllLogs,
	getAuthById,
	getAuthByToken,
	getAuthByEmail,
	updateAuth,
	deleteAuthByToken,
	isAlreadyLoggedIn,
	loggedOut,
};
