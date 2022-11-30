const { hashPassword } = require("../../utils/passwordEncript");
const db = require("../connections/MongoDBConnection");

const { getAllUsers, updateUser } = require("../crud/users.crud");

const encriptAllPassword = async () => {
	const users = await getAllUsers();
	console.log(users);
	users.forEach(async (user) => {
		console.log("old password", user.password);
		const encriptedPassword = hashPassword(user.password);

		const updatedUser = await updateUser(user._id, {
			password: encriptedPassword,
        });
        console.log("new password", updatedUser.password);
	});
};

encriptAllPassword();
