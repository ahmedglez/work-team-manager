const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");
const fs = require("fs");
const basename = path.basename(__filename);



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
	roles: {
		type: Array,
		default: ["user"],
	},
	ci: {
		type: String,
	},
	address: {
		type: String,
	},
	avatar: {
		type: String,
		default: path.join(__dirname, "../../assets/imgs/default-avatar.png"),
	},
	assignedTasks: [
		{
			type: Schema.Types.ObjectId,
			ref: "Tasks",
			default: [],
		},
	],

	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
	token: {
		type: String,
		default: null,
	},
	refreshtoken: {
		type: String,
		default: null,
	},
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
