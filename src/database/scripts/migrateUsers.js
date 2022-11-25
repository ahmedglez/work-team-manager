const { getAllUsers } = require("../crud/usersCrud");
const UserModel = require("../schemas/user.schema");
const db = require("../connections/MongoDBConnection");

const migrateUsers = async () => {
	const users = await getAllUsers();

	users.rows.forEach((user) => {
		const model = new UserModel({
			nickname: user.nickname,
			fullname: user.fullname,
			phone: user.phone,
			mobile: user.mobile,
			email: user.email,
			password: user.password,
			role: user.role,
			ci: user.ci,
			address: user.address,
		});
		model.save();
	});
};

migrateUsers();
