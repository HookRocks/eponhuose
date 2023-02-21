import React from 'react'

const EventProgramInfo=({tabbedMode}) => {
  if(tabbedMode){
    return (
      <div className='flex align-middle items-center justify-center min-h-full'>
        <h1 className='transform rotate-[270deg]'>
          EventProgramInfo
          </h1>
      </div>
    );
  } else {
    return (
      <div>
        EventProgramInfo
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, maiores.</p>
      </div>
    );
  }
}

export default EventProgramInfo