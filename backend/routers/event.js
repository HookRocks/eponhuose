const express = require("express");
require("dotenv").config();
const app = express.Router();
const {
  addToEvent,
  endEvent,
  createEvent,
  getEvent,
  getParticipants,
  updateEvent,
  visitEvent,
  getEventList,
} = require("../Modules/event");
const { getParticipantData } = require("../Modules/user");
const { sendEmail } = require("../Modules/email");
const connectDB = require("../connect");
const e = require("cors");
//should block the sender from sending without meeting certain requirements to be a host
app.use("/", async (req, res, next) => {
  next();
});
app.post("/getEventList", async (req, res) => {
  var eventList = await getEventList({});
  console.log(eventList);
  res.status(200).send(eventList);
});

//creates a new event into the database
app.post("/createEvent", async (req, res) => {
  const NewEvent = await createEvent(await JSON.parse(req.body)); // idk use the return?

  console.log("CREATED THE NEW EVENT WITH DATA:", req.body);
  res.status(200).send({ message: "living failure" });
});

//returns the current event and it's data
app.post("/getEvent", async (req, res) => {
  const body = req.body || {};
  const Event = await getEvent(body);

  console.log("RETURNED EVENT:", Event);
  res.status(200).send({ success: true, event: Event });
});

app.post("/updateEvent", async (req, res) => {
  const Filter = req.body.Filter;
  const Update = req.body.Update;

  if (!Filter || !Update) {
    console.warn(
      "Filter and/or update was not provided, structure your body like this: \n {Filter:{},Update:{}}"
    );
  }

  const Returned = updateEvent(Filter, Update);
  console.log("RETURNED EVENT:", Returned);
  res.status(200).send({ success: true, Updated: Returned });
});

//removes the event after compiling the event data to send as an email to the event host
app.post("/finishEvent", async (req, res) => {
  const body = req.body || {};

  const eventData = await getEvent(body);
  if (!eventData) {
    console.warn("event data was not found");
    res.status(400).send({ success: false });
    return;
  }

  const participantData = await getParticipantData(eventData.participants);
  var participants = participantData;
  var participantFormat = participantData
    .map(
      (participant) =>
        `<li><p>${participant.name}</p><p>${participant.email}</p><p>${participant.visitedEvent}</p></li>`
    )
    .join("");
  console.log(participantFormat, participantData, eventData);
  sendEmail(
    "rgrang816@west-mec.org",
    "PILLAGE THE MINORITY",
    participantFormat + `total estimated visitors:${eventData.visitorCount}`
  );
  //send emails to each participant to thank them for being there
  participants.forEach((participant) => {
    sendEmail(
      participant.email,
      `West-MEC NE ${eventData.eventName}`,
      /*
            put in the default email to send to the participants of the events
        
        */ "t",
      "t" /*put the string for the email body here, the content prior to this will be in whatever says SWAPOUT inside this string*/
    );
  });
  //send a message to each teacher with a list of the participants and visitors in their event/open house

  endEvent(body);
  console.log("ENDED EVENT:", body);
  res.status(200).send({ success: true });
});
app.post("/visitEvent", async (req, res) => {
  const body = req.body || {};
  await visitEvent(req, res);
  res.status(200).send({ success: true });
});

module.exports = app;
