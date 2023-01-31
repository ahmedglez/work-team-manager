const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");

const userSchema = new Schema({
	nickname: {
		type: String,
		unique: true,
		required: true,
	},
	fullname: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
	},
	mobile: {
		type: String,
		unique: true,
	},
	email: {
		type: String,
		unique: true,
		required: true,
	},
	password: {
		type: String,
		default: "admin1234",
		required: true,
	},
	roles: {
		type: Array,
		default: ["user"],
	},
	ci: {
		type: String,
		unique: true,
		required: true,
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
	isActive: {
		type: Boolean,
		default: false,
	},
	recoveryCode: {
		type: String,
		default: null,
	},

	refreshToken: {
		type: String,
		default: null,
	},

	lastConnection: {
		type: Date,
		default: Date.now
	},

	




});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
