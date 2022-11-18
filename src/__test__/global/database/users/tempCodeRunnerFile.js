const {
	getAllUsers,
	getUserById,
	getUserByNickname,
	getUserByEmail,
	getLastUser,
	getUserByRole,
	getLastTenUsers,
} = require("../../../../database/crud/usersCrud");
 const res = getAllUsers();
 console.log(res);