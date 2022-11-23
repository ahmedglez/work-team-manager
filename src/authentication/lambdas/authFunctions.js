const model = require("../model/authSchema");

/* Añadir logs */

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

/* Buscar logs*/

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

const getRecoveryCode = async (token) => {
	const response = await model.findOne({ token: token }).select("recoveryCode");
	return response;
};

/* Actualizar logs */
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

const setRecoveredCode = async (token, code) => {
	const response = await model.findOneAndUpdate(
		{
			token: token,
		},
		{
			recoveryCode: code,
		},
		{
			new: true,
		}
	);
	return response;
};

/* Verificar si ya esta logeado */
const isAlreadyLoggedIn = async (email) => {
	const response = await model.findOne({ email: email });
	if (response === null) {
		return false;
	}
	return response.loggedIn;
};

/* Eliminar logs */
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
const deleteAuthByToken = async (token) => {
	const response = await model.findOneAndDelete({
		token: token,
	});
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
	setRecoveredCode,
	getRecoveryCode,
};
