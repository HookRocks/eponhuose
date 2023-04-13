import React, {useState, useEffect} from 'react'
import EventComp from './Event';

const EventsList=() => {
  const [events,setEventList]=useState(["E"]);
  if(events[0]=="E"){
    fetch("http://localhost:3001/event/getEventList",{
      method: "POST",
      body: {}
    }).then(eventList => {
      console.log(eventList)
      eventList=eventList.json().then((e)=>{
        setEventList(e);
      });
    })
    }
  return (
    <div>
      <h1>Events</h1>
      {console.log(events)}
      {
        events.length?events.map((event) => (<div>
          <EventComp eventID={event._id} eventName={event.eventName} eventStartDate={Number(event.startDate)} eventEndDate={Number(event.endDate)} />
            </div>)):(<h1>There are 0 events</h1>)
      
      }
    </div>
  )
}

export default EventsList