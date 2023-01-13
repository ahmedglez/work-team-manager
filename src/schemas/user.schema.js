const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
	nickname: {
		type: String,
		unique: true,
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
		unique: true,
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
});

const UserModel = mongoose.model("Users", userSchema);

module.exports = UserModel;
