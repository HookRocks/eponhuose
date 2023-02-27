import React, {useState, useEffect} from 'react'

const EventProgramInfo=({tabbedMode, programName, teacherNames, POW, currentEvent}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

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
        {programName!=null? (<h1>{programName}</h1>):(<h1>West-MEC Northeast Campus</h1>)}
        <p>{}</p>
      </div>
    );
  }
}

export default EventProgramInfo