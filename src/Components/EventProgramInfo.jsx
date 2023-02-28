import React,{useState,useEffect} from 'react'
import programInfo from '../modules/ProgramInfo.json';

const EventProgramInfo=({tabbedMode, givenProgramName}) => {
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  if(tabbedMode){
    return (
      <div className={'flex align-middle items-center justify-center min-h-full font-extrabold text-2xl'}>
        <h1 className={windowWidth<640?``:`transform rotate-[270deg]`}>
          EventProgramInfo
          </h1>
      </div>
    );
  } else {
    return (
      <div>
        {givenProgramName!=null? (<h1>{givenProgramName}</h1>):(<h1>program list</h1>)}
        <p>{givenProgramName!=null? (<h1>{programInfo[givenProgramName].instructorName.join(", ")}</h1>):(<h1>All Teachers and staff</h1>)}</p>
        <p>Open House Event</p>
        {
          givenProgramName!=null?(<iframe src={programInfo[givenProgramName].POW} title='POW'></iframe>):(<h1>Please Select a Class</h1>)
        }
      </div>
    );
  }
}

export default EventProgramInfo