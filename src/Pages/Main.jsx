import React, {useState} from 'react'
import EventProgramInfo from '../Components/EventProgramInfo'

const Main=() => {
  const [clicked, setClicked]=useState(false);
  return (
    <div className='grid sm:grid-cols-[6fr_4fr] grid-rows-1 min-h-screen'>
      <div className='bg-pink-400' onClick={()=>setClicked(!clicked)}>
        Main
      </div>
      <div onClick={()=>setClicked(false)} className={`fixed sm:static sm:block bg-green-400 sm:w-full min-h-screen w-auto top-1/4 p-4 duration-500 transition ${clicked? 'translate-y-0':'translate-y-full'}`}>
      <EventProgramInfo className="border-2 border-black border-solid" />
      </div>
    </div>
  )
}

export default Main