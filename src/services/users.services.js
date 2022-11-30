const {
	createUser,
	getAllUsers,
	getUser,
	updateUser,
	deleteUser,
} = require("../database/crud/users.crud");

const { hashPassword, comparePassword } = require("../utils/passwordEncript");

const getAllUsersHandler = async (req, res, next) => {
	try {
		const users = await getAllUsers();
		const usersWithoutPassword = users.map((user) => {
			const { password, token, refreshtoken, roles, ...userWithoutPassword } =
				user._doc;
			return userWithoutPassword;
		});

		res.status(200).json({
			data: usersWithoutPassword,
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
		const { password, token, refreshtoken, roles, ...userWithoutPassword } =
			user._doc;
		res.status(200).json({
			data: userWithoutPassword,
			message: "user retrieved",
		});
	} catch (error) {
		next(error);
	}
};

const createUserHandler = async (req, res, next) => {
	const { body: user } = req;
	const encriptedPassword = hashPassword(user.password);
	const newUser = {
		...user,
		password: encriptedPassword,
	};

	try {
		const createdUser = await createUser(newUser);
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
