const express=require("express");
require("dotenv").config();
const app=express.Router()
const {addToEvent,endEvent,createEvent,getEvent,getParticipants}=require("../Modules/event")
const {getParticipantData}=require("../Modules/user")
const {sendEmail}=require('../Modules/email')
//should block the sender from sending without meeting certain requirements to be a host
app.use("/",async(req,res,next)=>{
    next();
})



//creates a new event into the database
app.post("/createEvent",async(req,res)=>{
    const {eventData}=await JSON.parse(req.body);
})

//returns the current event and it's data
app.post("/getEvent",async(req,res)=>{
    
    res.send({success:true,event:await getEvent()})
})
//should update the current event data with provided data
app.post("/updateEvent",async(req,res)=>{
    
})

//removes the event after compiling the event data to send as an email to the event host
app.post("/finishEvent",async(req,res)=>{
    const eventData=await getEvent();
    const participantData=await getParticipantData(eventData.participants);
    var participantFormat=participantData.map((participant)=>`<li><p>${participant.name}</p><p>${participant.email}</p><p>${eventData.eventName}</p></li>`).join("")
    sendEmail("rgrang816@west-mec.org","testing",participantFormat);
    endEvent();
})



module.exports=app