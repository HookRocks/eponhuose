const mongoose = require('mongoose')

const eventModel = new mongoose.Schema({
    host: {
        type: String,
        required: true
    },
    hostEmail: {
        type: String,
        required: true
    },
    startDate: {
        type: Number
    },
    endDate: {
        type: Number
    },
    eventName: {
        type: String
    },
    participants: {
        type: Array,
        required: true
    },
    eventPrograms: {
        type: Array,
        required: true
    }
})
module.exports = mongoose.model("events", eventModel);