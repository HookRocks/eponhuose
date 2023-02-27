import React,{useState,useEffect} from 'react'
import programInfo from '../modules/ProgramInfo.json';

const EventProgramInfo=({tabbedMode, programName}) => {
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);
  const program = JSON.parse(programInfo)

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
        {program!=null? (<h1>{programName}</h1>):(<h1>{program}</h1>)}
        <p>{program!=null?(<h1>h</h1>):(<h1>h</h1>)}</p>
      </div>
    );
  }
}

export default EventProgramInfo