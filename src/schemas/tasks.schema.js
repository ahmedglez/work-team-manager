const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const taskSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	status: {
		type: String,
		default: "pending",
		enum: ["pending", "in progress", "done"],
	},
	priority: {
		type: String,
		default: "low",
		enum: ["low", "medium", "high"],
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
