const mongoose = require('mongoose')

const eventModel = new mongoose.Schema({
    host: {
        type: String,
        required: true,
        default:'Roger'
    },
    hostEmail: {
        type: String,
        required: true,
        default:"rgrang816@west-mec.edu"
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
        default:[]
    },
    eventPrograms: {
        type: Array,
        default:[true,true,true,true,true,true,true,true,true,true,true]
    },
    visitorCount: {
        type:Number,
        default: 0
    }
})
module.exports = mongoose.model("events", eventModel);