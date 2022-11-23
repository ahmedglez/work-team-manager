const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const authSchema = new Schema({
	userId: {
		type: String,
	},
	email: {
		type: String,
	},
	password: {
		type: String,
		required: true,
	},
	token: {
		type: String,
		required: true,
	},
	loggedIn: {
		type: Boolean,
		default: false,
	},
	recoveryCode: {
		type: String,
		default: null,
	},
	date: {
		type: Date,
		default: Date.now,
	},
});

const AuthModel = mongoose.model("Auth", authSchema);

module.exports = AuthModel;
