const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	nickname: {
		type: String,
	},
	fullname: {
		type: String,
	},
	phone: {
		type: String,
	},
	mobile: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
		default: "admin1234",
	},
	role: {
		type: Number,
		required: true,
		default: 1,
	},
	ci: {
		type: String,
	},
	address: {
		type: String,
	},
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
