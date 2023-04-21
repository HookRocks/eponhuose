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
  getEndedEvents
} = require("../Modules/event");
const { getParticipantData } = require("../Modules/user");
const { sendEmail, sendBulkEmail, sendTeacherEmail} = require("../Modules/email");
const connectDB = require("../connect");
const e = require("cors");

const classData=require("../../src/modules/ProgramInfo.json")

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

  //compile event participant info for the manager to view in an email
  const participantData = await getParticipantData(eventData.participants);
  var participants = participantData;
  var participantFormat = participantData
    .map(
      (participant) =>
        `<li><p>${participant.name}</p><p>${participant.email}</p><p>${participant.visitedEvent}</p></li>`
    )
    .join("");
  console.log(participantFormat, participantData, eventData);
  //send email to event host/manager
  sendEmail(
    "rgrang816@west-mec.org",
    "PILLAGE THE MINORITY",
    participantFormat + `total estimated visitors:${eventData.visitorCount}`
  );
  //send emails to each participant to thank them for being there
  sendBulkEmail(participants.map((participant)=>participant.email),"test2","test2")
  
  
  //send a message to each teacher with a list of the participants and visitors in their event/open house
  // Create an array of instructor emails and corresponding program names
  const teachersToEmail = [];
  eventData.eventPrograms.forEach((val, i) => {
    if (val) {
      classData[i].instructorName.forEach((name, j) => {
        teachersToEmail.push({
          name,
          email: classData[i].instructorEmail[j],
          programName: classData[i].programName
        });
      });
    }
  });

  // Loop through the instructor emails and send the email to each one
  teachersToEmail.forEach(teacher => {
    // Filter the participants array to only include those who visited the teacher's program
    const programParticipants = participants.filter(participant => participant.visitedEvent === eventData.eventName && participant.visitedProgram === teacher.programName);
    // Generate the email content using the program name and participant list
    const emailContent = sendTeacherEmail(teacher.programName, programParticipants);
    // Send the email using the generated content
    sendEmail(teacher.email, teacher.name, emailContent);
  });


  endEvent(body);
  console.log("ENDED EVENT:", body);
  res.status(200).send({ success: true });
});
app.post("/visitEvent", async (req, res) => {
  const body = req.body || {};
  await visitEvent(req, res);
  res.status(200).send({ success: true });
});

app.post('/deleteEvent',async(req,res)=>{
  const body = req.body || {};
  endEvent(body);
})

app.post("/getEndedEvents",async(req,res)=>{
  res.send(await getEndedEvents(req,res));
})

module.exports = app;
