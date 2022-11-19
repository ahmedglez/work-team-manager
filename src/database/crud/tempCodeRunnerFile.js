const AuthModel = require("../../schemas/auth.schema");
const db = require("../connections/MongoDBConnection");
auth = {
	id: "1",
	email: "ahmed@gmail.com",
	password: "eded",
	token: "123",
};

const addAuth = (auth) => {
	const myAuth = AuthModel(auth);
	return myAuth.save();
};
