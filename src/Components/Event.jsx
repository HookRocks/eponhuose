import React from 'react'
import {RiDeleteBin5Fill} from 'react-icons/ri'

const EventComp=({eventName,eventStartDate,eventEndDate}) => {
  let a= new Date(Number(eventStartDate));
  let b=new Date(Number(eventEndDate));
  let startDateString=a.toLocaleString("en-US",{dateStyle: "short", timeStyle: "short", hour12: "true"});
  let endDateString=b.toLocaleString("en-US",{dateStyle:"short", timeStyle: "short", hour12: "true"});
  return (
    <div>
      <div className='w-full p-2 gap-7 flex flex-row bg-blue-900 border border-2 border-blue-800 rounded-xl justify-center'><span>{eventName}</span> <span>Start Date: {startDateString}</span> <span>End Date: {endDateString}</span><button className='hover:text-red-400' onClick={() => {alert(`Are you sure you want to delete event: ${eventName} starting on: ${startDateString} and ending on: ${endDateString}`)}}>{console.log(startDateString)}<RiDeleteBin5Fill/></button></div>
    </div>
  )
}

export default EventComp;