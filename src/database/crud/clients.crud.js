const ClientModel = require("../schemas/client.schema");

const getAllClients = async () => {
	const clients = await ClientModel.find();
	return clients;
};

const getClientById = async (id) => {
	const client = await ClientModel.findById(id);
	return client;
};

const getClientsbyType = async (type) => {
	const clients = await ClientModel.find({
		type: type,
	});
	return clients;
};

const getClientsbyLocation = async (location) => {
	const clients = await ClientModel.find({
		location: location,
	});
	return clients;
};

const getRecentClients = async () => {
	const clients = await ClientModel.find().sort({ createdAt: -1 }).limit(5);
	return clients;
};

const getClientsInLastSevenDays = async () => {
	const clients = await ClientModel.find({
		createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
	});
	return clients;
};

const createClient = async (
	nickname,
	fullname,
	phone,
	mobile,
	email,
	location,
	address,
	type
) => {
	const client = new ClientModel({
		nickname: nickname,
		fullname: fullname,
		phone: phone,
		mobile: mobile,
		email: email,
		location: location,
		address: address,
		type: type,
	});
	await client.save();
};
