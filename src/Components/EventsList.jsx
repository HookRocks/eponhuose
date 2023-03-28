import React, {useState, useEffect} from 'react'
import { Event } from 'jquery'

const EventsList=() => {
  const [events,setEventList]=useState(["E"]);
  if(events[0]=="E") {
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
        events[0]!="E"?
        events.map((event) => {
          <Event eventName={event.eventName} eventStartDate={event.startDate} eventEndDate={event.endDate}/>
      }):(<h1>No events exist</h1>)
      
      }
    </div>
  )
}

export default EventsList