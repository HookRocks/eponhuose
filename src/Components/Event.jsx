import React from 'react'
import { RiDeleteBin5Fill } from 'react-icons/ri'

const EventComp = ({ eventName, eventStartDate, eventEndDate, eventID }) => {
  let a = new Date(Number(eventStartDate));
  let b = new Date(Number(eventEndDate));
  let startDateString = a.toLocaleString("en-US", { dateStyle: "short", timeStyle: "short", hour12: "true" });
  let endDateString = b.toLocaleString("en-US", { dateStyle: "short", timeStyle: "short", hour12: "true" });

  function deleteEventButton(eventId) {
    fetch(`https://eponback-k6b6.onrender.com/event/deleteEvent`, {
      method: "POST",
      body: JSON.stringify({
        _id: eventId,
      }),
      headers:{
        auth:sessionStorage.getItem("auth")
      }
    })
  }
  return (
    <div>
      <div id={eventID} className='w-full p-2 gap-7 flex flex-row bg-[#f5a018] border-2 border-[#c08d3c] shadow-md rounded-xl justify-center'><span>{eventName}</span> <span>Start Date: {startDateString}</span> <span>End Date: {endDateString}</span><button className='hover:text-[#d43939]' onClick={() => { deleteEventButton(eventID) }}>{console.log(startDateString)}<RiDeleteBin5Fill /></button></div>
    </div>
  )
}

export default EventComp;