const connectDB = require("../connect")
require('dotenv').config()
const event = require('../models/event')
const endedEvent=require("../models/endedEvent")


//returns all events
const getEventList = async (args) => {
    await connectDB(process.env.MONGO_URI);
    
    return await event.find(args).sort({startDate:-1});
}

//returns current event
const getEvent = async (args) => {
    await connectDB(process.env.MONGO_URI)
    if(args.startDate=="current"||args=={}||args==undefined){args={};args.startDate={$lte:Date.now()};args.endDate={$gte:Date.now()}}

    return await event.find(args).sort({startDate:-1})
}
//returns the array of ids for participants in an event
const getParticipants = async () => {
    return (await getEvent("current")).participants
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
    EventData.participants=[]
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
    const removedEvent=event.findOne(JSON.parse(args));
    console.log(removedEvent)
    if(removedEvent){
        //need to finish this
        var ev=new endedEvent({
            eventName:removedEvent.eventName,
            endDate:removedEvent.endDate,
            startDate:removedEvent.startDate,
            eventPrograms:removedEvent.eventPrograms,
            visitorCount:removedEvent.visitorCount
        })
        await ev.save()
        await event.deleteOne(JSON.parse(args));
    }
    return "loser"
}


//adds 1 to number of people going to an event
const visitEvent=async(req,res)=>{
    const {Filter}=JSON.parse(req.body);
    await connectDB(process.env.MONGO_URI);
    await event.findOneAndUpdate(Filter,{$inc:{visitorCount:1}});
    console.log("event Visited")
    return {success:true,msg:"i dunno mate"};
}
//returns n most recent events
const returnNumber=10;
const getEndedEvents=async(req,res)=>{
    await connectDB(process.env.MONGO_URI);
    //sorts by most recent
    const returnList=await endedEvent.find({}).sort({_id:-1}).limit(returnNumber)
    return returnList;
}


//clears any events that should be ended and creates a timeout to run again at the next start of an hour
const Timers=require("timers")
const clearEndedEvents=async ()=>{
    
    var endTime=Date.now();
    await connectDB(process.env.MONGO_URI)
    const endingList=await event.find({endDate:{$lte:endTime}});
    endingList.forEach((event)=>{
        endEvent(JSON.stringify(event))
    })
    Timers.setTimeout(clearEndedEvents,(3600000-(Date.now()%3600000)))
}



module.exports = { endEvent, createEvent, getEvent, getParticipants, updateEvent, getEventList,visitEvent,getEndedEvents,clearEndedEvents}