const UserModel = require("../schemas/user.schema");

const createUser = async (user) => {
	const newUser = new UserModel(user);
	return await newUser.save();
};

const getUsers = async () => {
	return await UserModel.find({});
};

const getUser = async (id) => {
	return await UserModel.findById(id);
};

const updateUser = async (id, user) => {
	return await UserModel.findByIdAndUpdate(
		id,
		{ ...user, updatedAt: Date.now() },
		{ new: true }
	);
};

const deleteUser = async (id) => {
	return await UserModel.findByIdAndDelete(id);
};

module.exports = {
	createUser,
	getUsers,
	getUser,
	updateUser,
	deleteUser,
};
