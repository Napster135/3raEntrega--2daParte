const mongoose = require('mongoose');

const messagesSchema = new mongoose.Schema({
    user: {
        required: true,
        unique: true,
        type: String
    },
    message: {
        required: true,
        unique: true,
        type: String
    }
})

const messageModel = mongoose.model("Messages", messagesSchema)

module.exports = messageModel
