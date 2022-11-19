const AuthModel = require("../schemas/auth.schema");

const auth = {
	id: "000111",
	email: "ahmediglez@gmaul.com",
	password: "1234",
	token: "eltoken",
};
const addAuth = (auth) => {
	const myAuth = AuthModel(auth);
	return myAuth.save();
};