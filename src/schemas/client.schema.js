const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const clientSchema = new Schema({
    nickname: {
        type: String,
        unique: true,
        required: true,
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
    location: {
        type: String,
    },
    address: {
        type: String,
    },
    type: {
        type: String,
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

const ClientModel = mongoose.model("Clients", clientSchema);

module.exports = ClientModel;