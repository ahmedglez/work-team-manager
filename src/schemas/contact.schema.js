const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const path = require("path");
const fs = require("fs");

const contactSchema = new Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
	},
	phone: {
		type: String,
	},
	message: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

contactSchema.methods.toJSON = function () {
	const obj = this.toObject();
	delete obj.password;
	return obj;
};

module.exports = mongoose.model("Contact", contactSchema);
// 	updatedAt: {
// 		type: Date,
// 		default: Date.now,
// 	},
// });
