/* eslint-disable jsx-a11y/anchor-is-valid */
import React,{useState,useEffect} from 'react'
import programInfo from '../modules/ProgramInfo.json';
import swal from '@sweetalert/with-react';
import AnimatedArrowButton from './AnimatedArrowButton'



const EventProgramInfo=({tabbedMode,givenProgramName}) => {
    const [windowWidth,setWindowWidth]=useState(window.innerWidth);
  const [currentIndex,setCurrentIndex]=useState(0);
  const [personName,setPersonName]=useState("");

  const swalBax=() => {
     swal(<div><form onSubmit={()=>{alert("a")}}>
    <label for="Name">Name: </label><input onChange={(e)=>{setPersonName(e.target.value)}} id='Name' name='Name' type="text" placeholder='Name goes here' value={personName}/><br /><br />
    <label for="Email">Email: </label><input id='Email' name='Email' type="email" placeholder='Email goes here' />
  </form></div>).then(okay => {
  //   fetch('url', {
  //   Method: 'POST',
  //   Headers: {
  //     Accept: 'application.json',
  //     'Content-Type': 'application/json'
  //   },
  //   body: {},
  // })
  })
  }

  const handlePrevClick = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNextClick = () => {
    if (currentIndex < programInfo[givenProgramName].POW.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };


  useEffect(() => {
    const handleWindowResize=() => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize',handleWindowResize);

    return () => {
      window.removeEventListener('resize',handleWindowResize);
    };
  });
  if(tabbedMode) {
    return (
      <div className='flex align-middle items-center justify-center min-h-full font-extrabold text-2xl'>
        <h1 className={windowWidth<640? ``:`transform rotate-[270deg]`}>
          EventProgramInfo
        </h1>
      </div>
    );
  } else {
    return (
      <div className=' h-full text-center align-center justify-center'>
        {givenProgramName!=null? (<h1>{givenProgramName}</h1>):(<b>program list</b>)}
        <p>{givenProgramName!=null? (<h1>{programInfo[givenProgramName].instructorName.join(", ")}</h1>):(<b>All Teachers and staff</b>)}</p>
        <p>Open House Event</p>
        {
          givenProgramName!=null? (<div className='w-full'>{programInfo[givenProgramName].POW.length>1?(<div className='text-center'><button onClick={(ev) => {ev.stopPropagation(); handlePrevClick()}} className="arrow relative w-12 h-12 text-orange-600 font-extrabold text-4xl"><div className="arrow-left">&lArr;</div></button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<button onClick={(ev) => {ev.stopPropagation(); handleNextClick()}} className="arrow relative w-12 h-12 text-orange-600 font-extrabold text-4xl"><div className="arrow-right">&rArr;</div></button></div>):(<div className='mb-4'></div>)}<iframe src={programInfo[givenProgramName].POW[currentIndex]} className='w-full h-[36rem] sm:h-[40rem]' title="POW"/></div>):(<h1>Please Select a Class</h1>)
        }
        
        <button onClick={(ev) => {ev.stopPropagation(); swalBax();}}><a>Join Event</a></button>
      </div>
    );
    
  }

  
}
export default EventProgramInfo