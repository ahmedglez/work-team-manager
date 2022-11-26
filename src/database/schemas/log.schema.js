const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const logSchema = new Schema({
	user: {
		type: String,
	},
	action: {
		type: String,
    },
    message: {
        type: String,
    },
	date: {
		type: Date,
		default: Date.now,
	},
});

const LogModel = mongoose.model("Logs", logSchema);

module.exports = LogModel;
