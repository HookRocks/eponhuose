const connectDB = require("../connect")
require('dotenv').config()
const event = require('../models/event')

//returns current event
const getEvent = async () => {
    await connectDB(process.env.MONGO_URI)
    return await event.findOne({})
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
    try {
        const NewEvent = new event(EventData)
        await NewEvent.save()
        return NewEvent
    } catch (err) {
        console.log("event failed to be created: ", err)
    }
}

//should only call after the event is over and has sent needed info to the host
const endEvent = async () => {
    await connectDB(process.env.MONGO_URI);
    event.deleteMany({});
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


module.exports = { addToEvent, endEvent, createEvent, getEvent, getParticipants }