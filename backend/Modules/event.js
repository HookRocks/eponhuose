const connectDB = require("../connect")
require('dotenv').config()
const event = require('../models/event')

//returns current event
const getEvent = async (args) => {
    await connectDB(process.env.MONGO_URI)
    return await event.findOne(args)
}
//returns the array of ids for participants in an event
const getParticipants = async () => {
    return (await getEvent()).participants
}

//creates event to store relevant data for the host to be sent later
const createEvent = async (EventData) => {
    // const eventData = {
    //     host,
    //     email,
    //     startDate,
    //     endDate: (endDate != null ? endDate : startDate),
    //     eventName: (eventName != null ? eventName : startDate),
    //     participants: []
    // }
    await connectDB(process.env.MONGO_URI);
    try {
        const NewEvent = new event(EventData)
        await NewEvent.save()
        return NewEvent
    } catch (err) {
        console.log("event failed to be created: ", err)
    }
}

const updateEvent = async (filter, update) => {
    await connectDB(process.env.MONGO_URI);
    const Returned = await event.findOneAndUpdate(filter, update)
    return Returned
}

//should only call after the event is over and has sent needed info to the host
const endEvent = async (args) => {
    await connectDB(process.env.MONGO_URI);
    event.deleteMany(args)
}

//adds user to event participants if not already in it
const addToEvent = async (userID) => {
    const eventData = await getEvent();

    if (!eventData) return { success: false, msg: "no active event to join" }

    if (!eventData.participants.includes(userID)) {
        eventData.participants.push(userID)
        event.findByIdAndUpdate(eventData._id, { participants: eventData.participants })
        return { success: true, msg: "added user to event" }
    }
    return { success: false, msg: "user already in event" }
}


module.exports = { addToEvent, endEvent, createEvent, getEvent, getParticipants, updateEvent }