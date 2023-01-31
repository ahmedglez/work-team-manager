const { hashPassword } = require("../../utils/auth/passwordEncript");
const db = require("../connections/MongoDBConnection");

const { getAllUsers, updateUser } = require("../crud/users.crud");

const encriptAllPassword = async () => {
	const users = await getAllUsers();
	console.log(users);
	users.forEach(async (user) => {
		const encriptedPassword = hashPassword(user.password);
		await updateUser(user._id, {
			password: encriptedPassword,
		});
	});
};

encriptAllPassword();
