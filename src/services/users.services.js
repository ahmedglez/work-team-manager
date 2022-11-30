const {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
} = require("../database/crud/users.crud");

const getAllUsersHandler = async (req, res, next) => {
	try {
		const users = await getUsers();
		console.log(users);
		res.status(200).json({
			data: users,
			message: "users listed",
		});
	} catch (error) {
		next(error);
	}
};

const getUserByIdHandler = async (req, res, next) => {
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

const createUserHandler = async (req, res, next) => {
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

const updateUserHandler = async (req, res, next) => {
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

const deleteUserHandler = async (req, res, next) => {
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
	getAllUsersHandler,
	getUserByIdHandler,
	createUserHandler,
	updateUserHandler,
	deleteUserHandler,
};
