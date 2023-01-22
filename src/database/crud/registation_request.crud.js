const RegistrationRequestModel = require("../../schemas/registation_request.schema");

const createRegistrationRequest = async (registrationRequest) => {
	const newRegistrationRequest = new RegistrationRequestModel(
		registrationRequest
	);
	return await newRegistrationRequest.save();
};

const getAllRegistrationRequests = async () => {
	return await RegistrationRequestModel.find({});
};

const getRegistrationRequest = async (id) => {
	return await RegistrationRequestModel.findById(id);
};

const getRegistrationRequestByEmail = async (email) => {
	return await RegistrationRequest.findOne({ email });
};

const updateRegistrationRequest = async (id, registrationRequest) => {
	return await RegistrationRequestModel.findByIdAndUpdate(
		id,
		{ ...registrationRequest, updatedAt: Date.now() },
		{ new: true }
	);
};

const deleteRegistrationRequest = async (id) => {
	return await RegistrationRequestModel.findByIdAndDelete(id);
};

module.exports = {
	createRegistrationRequest,
	getAllRegistrationRequests,
	getRegistrationRequestByEmail,
	getRegistrationRequest,
	updateRegistrationRequest,
	deleteRegistrationRequest,
};
