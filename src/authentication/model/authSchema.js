const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authSchema = new Schema({
	userId: {
		type: String,
		required: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
});

const AuthModel = mongoose.model("Auth", authSchema);

module.exports = AuthModel;
