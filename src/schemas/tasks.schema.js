const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: {
		type: String,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
	},
	priority: {
		type: String,
	},
	assignedTo: [
		{
			type: Schema.Types.ObjectId,
			ref: "Users",
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
});

const TaskModel = mongoose.model("Tasks", taskSchema);

module.exports = TaskModel;
