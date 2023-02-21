const express = require("express");
require("dotenv").config();
const app = express.Router()
const { addToEvent, endEvent, createEvent, getEvent, getParticipants, updateEvent } = require("../Modules/event")
const { getParticipantData } = require("../Modules/user")
const { sendEmail } = require('../Modules/email')
//should block the sender from sending without meeting certain requirements to be a host
app.use("/", async (req, res, next) => {
    next();
})



//creates a new event into the database
app.post("/createEvent", async (req, res) => {
    const NewEvent = await createEvent(req.body) // idk use the return?

    console.log("CREATED THE NEW EVENT WITH DATA:", req.body)
    res.status(200).send({ message: "living failure" })
})

//returns the current event and it's data
app.post("/getEvent", async (req, res) => {
    const body = req.body || {}
    const Event = await getEvent(body)

    console.log("RETURNED EVENT:", Event)
    res.status(200).send({ success: true, event: Event })
})

app.post("/updateEvent", async (req, res) => {
    const Filter = req.body.Filter
    const Update = req.body.Update

    if (!Filter || !Update) {
        console.warn("Filter and/or update was not provided, structure your body like this: \n {Filter:{},Update:{}}")
    }

    const Returned = updateEvent(Filter, Update)
    console.log("RETURNED EVENT:", Returned)
    res.status(200).send({ success: true, Updated: Returned })
})

//removes the event after compiling the event data to send as an email to the event host
app.post("/finishEvent", async (req, res) => {
    const body = req.body || {}

    const eventData = await getEvent(body);
    const participantData = await getParticipantData(eventData.participants);
    var participantFormat = participantData.map((participant) => `<li><p>${participant.name}</p><p>${participant.email}</p><p>${eventData.eventName}</p></li>`).join("")
    sendEmail("rgrang816@west-mec.org", "testing", participantFormat);
    endEvent(body);
    console.log("ENDED EVENT:", body)
    res.status(200).send({ success: true })
})



module.exports = app