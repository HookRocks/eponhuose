import React from 'react'
import {RiDeleteBin5Fill} from 'react-icons/ri'

const Event=({eventName,eventStartDate,eventEndDate}) => {
  return (
    <div>
      <div className='w-full p-2 gap-7 flex flex-row bg-blue-900 border border-2 border-blue-800 rounded-xl justify-center'><span>{eventName}</span> <span>Start Date: {eventStartDate}</span> <span>End Date: {eventEndDate}</span><button className='hover:text-red-400' onClick={()=>{alert(`Are you sure you want to delete event: ${eventName} starting on: ${eventStartDate} and ending on: ${eventEndDate}`)}}><RiDeleteBin5Fill/></button></div>
    </div>
  )
}

export default Event