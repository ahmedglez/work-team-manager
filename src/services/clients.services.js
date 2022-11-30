const {
	getAllClients,
	getClientById,
	getClientsbyType,
	getClientsbyLocation,
	getRecentClients,
	getClientsInLastSevenDays,
	createClient,
	updateClient,
	deleteClient,
} = require("../database/crud/clients.crud");

const getAllClients = async (req, res, next) => {
	try {
		const clients = await getAllClients();
		res.status(200).json({
			data: clients,
			message: "clients listed",
		});
	} catch (error) {
		next(error);
	}
};

const getClientById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const client = await getClientById(id);
		res.status(200).json({
			data: client,
			message: "client retrieved",
		});
	} catch (error) {
		next(error);
	}
};

const getClientsbyType = async (req, res, next) => {
	const { type } = req.params;

	try {
		const clients = await getClientsbyType(type);
		res.status(200).json({
			data: clients,
			message: "clients listed",
		});
	} catch (error) {
		next(error);
	}
};

const getClientsbyLocation = async (req, res, next) => {
	const { location } = req.params;

	try {
		const clients = await getClientsbyLocation(location);
		res.status(200).json({
			data: clients,
			message: "clients listed",
		});
	} catch (error) {
		next(error);
	}
};

const getRecentClients = async (req, res, next) => {
	try {
		const clients = await getRecentClients();
		res.status(200).json({
			data: clients,
			message: "clients listed",
		});
	} catch (error) {
		next(error);
	}
};

const getClientsInLastSevenDays = async (req, res, next) => {
	try {
		const clients = await getClientsInLastSevenDays();
		res.status(200).json({
			data: clients,
			message: "clients listed",
		});
	} catch (error) {
		next(error);
	}
};

const createClient = async (req, res, next) => {
	const { nickname, fullname, phone, mobile, email, location, address, type } =
		req.body;

	try {
		await createClient(
			nickname,
			fullname,
			phone,
			mobile,
			email,
			location,
			address,
			type
		);
		res.status(201).json({
			data: req.body,
			message: "client created",
		});
	} catch (error) {
		next(error);
	}
};

const updateClient = async (req, res, next) => {
	const { id } = req.params;
	const { nickname, fullname, phone, mobile, email, location, address, type } =
		req.body;

	try {
		await updateClient(
			id,
			nickname,
			fullname,
			phone,
			mobile,
			email,
			location,
			address,
			type
		);
		res.status(200).json({
			data: req.body,
			message: "client updated",
		});
	} catch (error) {
		next(error);
	}
};

const deleteClient = async (req, res, next) => {
	const { id } = req.params;

	try {
		await deleteClient(id);
		res.status(200).json({
			data: id,
			message: "client deleted",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllClients,
	getClientById,
	getClientsbyType,
	getClientsbyLocation,
	getRecentClients,
	getClientsInLastSevenDays,
	createClient,
	updateClient,
	deleteClient,
};
