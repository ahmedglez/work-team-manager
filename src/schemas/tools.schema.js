const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const toolSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: true,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        default: "available",
        enum: ["available", "in use", "broken"],
    },
    assignedTo: [
        {
            type: Schema.Types.ObjectId,
            ref: "Users",
        },
    ],

    quantity: {
        type: Number,
        default: 1,
        min: 0,
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

const ToolModel = mongoose.model("Tools", toolSchema);

module.exports = ToolModel;