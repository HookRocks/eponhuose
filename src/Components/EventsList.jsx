import React, { useState, useEffect } from 'react'
import EventComp from './Event';

const EventsList = () => {
  const [events, setEventList] = useState(["E"]);
  useEffect(() => {
    if (events[0] == "E") {
      fetch("http://localhost:3001/event/getEventList", {
        method: "POST",
        body: {}
      }).then(eventList => {
        console.log(eventList)
        eventList = eventList.json().then((e) => {
          setEventList(e);
        });
      })
    }
  }, [])

  return (
    <div>
      <h1>Events</h1>
      {
        events.length > 0 && events[0] != "E" ? events.map((EventItem) => (
          <EventComp key={EventItem._id} eventID={EventItem._id} eventName={EventItem.eventName} eventStartDate={Number(EventItem.startDate)} eventEndDate={Number(EventItem.endDate)} />)) : (<h1 key={9}>There are 0 events</h1>)

      }
    </div>
  )
}

export default EventsList