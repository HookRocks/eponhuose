import React, {useState, useEffect} from 'react'
import { Event } from 'jquery'

const EventsList=() => {
  const [events,setEventList]=useState([]);
  fetch("localhost:3001/event/getEventList",{
    method:"POST",
    Body:{}
  }).then(eventList => {
    setEventList(eventList);
  })

  return (
    <div>
      <h1>Events</h1>
      {
        events.map((event) => {
          <Event eventName={event.eventName} eventStartDate={event.startDate} eventEndDate={event.endDate}/>
        })
      }
    </div>
  )
}

export default EventsList