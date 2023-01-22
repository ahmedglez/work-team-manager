const monggoose = require("mongoose");
const Schema = monggoose.Schema;

const registrationRequestSchema = new Schema({
	fullname: {
		type: String,
		required: true,
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
	roles: {
		type: String,
		required: true,
		default: "user",
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
	updatedAt: {
		type: Date,
		default: Date.now,
	},
});

const RegistrationRequestModel = monggoose.model(
	"RegistrationRequests",
	registrationRequestSchema
);

module.exports = RegistrationRequestModel;
