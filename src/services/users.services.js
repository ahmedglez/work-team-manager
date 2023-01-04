const {
	createUser,
	getAllUsers,
	getUser,
	getUserByEmail,
	updateUser,
	deleteUser,
} = require("../database/crud/users.crud");

const { hashPassword } = require("../utils/auth/passwordEncript");

const UserServices = () => {
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

	const getUserbyEmailHandler = async (req, res, next) => {
		const { email } = req.body;
		try {
			const user = await getUserByEmail(email);
			const { password, token, refreshtoken, roles, ...userWithoutPassword } =
				user._doc;
			res.status(200).json({
				data: userWithoutPassword,
				message: "user retrieved",
			});
			return user;
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

	const updateUserPasswordHandler = async (req, res, next) => {
		const { id } = req.params;
		const { password } = req.body;
		const updatedUser = await getUser(id);
		updateUser.password = password;
		try {
			updatedUser = await updateUser(id, updatedUser);
			res.status(
				200,
				json({
					data: updatedUser,
					message: `password changed for user ${id}`,
				})
			);
		} catch (error) {
			next(error);
		}
	};

	const setUserOnlineHandler = async (req, res, next) => {
		const { id } = req.params;
		const { user } = req.body;
		try {
			const updatedUser = await updateUser(id, { ...user, isOnline: true });
			res.status(200).json({
				data: updateUser,
				message: `user ${id} is online now`,
			});
		} catch (error) {
			next(error);
		}
	};

	const setUserOfflineHandler = async (req, res, next) => {
		const { id } = req.params;
		const { user } = req.body;
		try {
			const updatedUser = await updateUser(id, { ...user, isOnline: false });
			res.status(200).json({
				data: updateUser,
				message: `user ${id} is online now`,
			});
		} catch (error) {
			next(error);
		}
	};

	const assignNewRoleHandler = async (req, res, next) => {
		const { id } = req.params;
		const { body: role } = req;
		const updatedUser = await getUser(id);
		updatedUser.roles.push(role);
		try {
			updatedUser = await updateUser(id, updatedUser);
			res.status(
				200,
				json({
					data: updatedUser,
					message: `role assigned to user ${id}`,
				})
			);
		} catch (error) {
			next(error);
		}
	};

	const deleteAssignedRoleHandler = async (req, res, next) => {
		const { id } = req.params;
		const { body: role } = req;
		const updatedUser = await getUser(id);
		updatedUser.roles = updatedUser.roles.filter(
			(assignedRole) => assignedRole._id !== role._id
		);
		try {
			updatedUser = await updateUser(id, updatedUser);
			res.status(
				200,
				json({
					data: updatedUser,
					message: `role deleted from user ${id}`,
				})
			);
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

	return {
		getAllUsersHandler,
		getUserByIdHandler,
		createUserHandler,
		updateUserHandler,
		updateUserPasswordHandler,
		setUserOnlineHandler,
		setUserOfflineHandler,
		assignNewRoleHandler,
		deleteAssignedRoleHandler,
		deleteUserHandler,
	};
};

module.exports = UserServices;
