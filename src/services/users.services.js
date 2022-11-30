const {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
} = require("../database/crud/users.crud");

const getAllUsers = async (req, res, next) => {
	try {
		const users = await getUsers();
		res.status(200).json({
			data: users,
			message: "users listed",
		});
	} catch (error) {
		next(error);
	}
};

const getUserById = async (req, res, next) => {
	const { id } = req.params;

	try {
		const user = await getUser(id);
		res.status(200).json({
			data: user,
			message: "user retrieved",
		});
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	const { body: user } = req;

	try {
		const createdUser = await createUser(user);
		res.status(201).json({
			data: createdUser,
			message: "user created",
		});
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	const { id } = req.params;
	const { body: user } = req;

	try {
		const updatedUser = await updateUser(id, user);
		res.status(200).json({
			data: updatedUser,
			message: "user updated",
		});
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	const { id } = req.params;

	try {
		const deletedUser = await deleteUser(id);
		res.status(200).json({
			data: deletedUser,
			message: "user deleted",
		});
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllUsers,
	getUserById,
	createUser,
	updateUser,
	deleteUser,
};
