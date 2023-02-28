import React,{useState,useEffect} from 'react'
import programInfo from '../modules/ProgramInfo.json';
import Swal from 'sweetalert2/with-react';

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
        {givenProgramName!=null? (<h1>{givenProgramName}</h1>):(<b>program list</b>)}
        <p>{givenProgramName!=null? (<h1>{programInfo[givenProgramName].instructorName.join(", ")}</h1>):(<b>All Teachers and staff</b>)}</p>
        <p>Open House Event</p>
        {
          givenProgramName!=null?(programInfo[givenProgramName].POW.map((POw, index)=>(<iframe src={POw} title='POW' className='w-full h-[36rem] sm:h-[40rem]' key={index}></iframe>))):(<h1>Please Select a Class</h1>)
        }
        <button><a>Join Event</a></button>
        Swal(
        
        )
      </div>
    );
  }
}

export default EventProgramInfo