import React,{useState,useEffect} from 'react'
import $ from 'jquery';
import PreBuiltCheckbox from '../Components/PreBuiltCheckbox';

const AdminPage=() => {
  function toggle(divId, sourceCheckbox) {
    var divElement = document.getElementById(divId);
    var inputElements = divElement.getElementsByTagName('input');
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type != 'checkbox')
            continue;
        inputElements[i].checked = sourceCheckbox.checked;
    }
}
  const [clicked,setClicked]=useState(false);
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

  return (
    <div className={windowWidth<640?`grid sm:grid-cols-[6fr_4fr] grid-rows-1 min-h-screen`:`grid  lg:${clicked?'grid-cols-[9fr_1fr] grid-rows-1 min-h-screen':'grid-cols-[6fr_4fr] grid-rows-1 min-h-screen'} `}>
      <div className={windowWidth<640? `${clicked? '':'flex text-center justify-center min-w-full font-extrabold text-2xl '} bg-pink-400 `:`bg-pink-400 w-full`}>
        Map
      </div>
      <div className={windowWidth<640? ` text-white fixed sm:static sm:block bg-blue-600 w-full min-h-screen w-auto top-1/4 p-4 duration-500 transition ${clicked? 'translate-y-[33rem]':'translate-y-[-8rem]'}`:`static bg-blue-600 min-h-screen w-full p-4 duration-500 transform text-white `} >
        
        <form action='/admin/submited' target='_self' method='get'>
          <fieldset className='border border-solid border-gray-300 p-3 rounded-lg'>
            <legend>Create Event</legend>
            <div className='flex align-start justify-start flex-col gap-4'>
              <div><label>Event Name: </label><input type="text" name="eventName" className='text-black' id="eventName" placeholder='Event Name' /></div>
              <div><label>Start Date and Time: </label><input type="datetime-local" id="startTime" className='text-black' name="startTime"/></div>
              <div><label>End Date and Time: </label><input type="datetime-local" id="endTime" className='text-black' name="endTime"/></div>
            </div>
          <fieldset className='border border-solid border-gray-300 p-3 rounded-lg'>
            <legend>Programs</legend>
              <PreBuiltCheckbox boxId="select-all" onClick={() => {toggle("allClasses", this)}} boxContent="All Programs" className=""/>
            <div className='flex align-center justify-center gap-x-9 mt-2 ml-3'>
              <div id='allClasses' className='flex align-start justify-start flex-col'>
                <PreBuiltCheckbox boxId="Coding" boxContent="Coding" />
                <PreBuiltCheckbox boxId="HVAC" boxContent="HVAC" />
                <PreBuiltCheckbox boxId="ACTech" boxContent="AC Technology" />
                <PreBuiltCheckbox boxId="ElectricTradeSpecial" boxContent="Electrical Trade Speciality" />
                <PreBuiltCheckbox boxId="Pharmacy" boxContent="Pharmacy Science" />
                <PreBuiltCheckbox boxId="VetScience" boxContent="Veterinary Science" />
              </div>
              <div  className='flex align-center justify-start flex-col'>
                <PreBuiltCheckbox boxId="MA" boxContent="Medical Assisting" />
                <PreBuiltCheckbox boxId="AutoTech" boxContent="Automotive Technology" />
                <PreBuiltCheckbox boxId="Collision" boxContent="Collision Repair and Refinishing" />
                <PreBuiltCheckbox boxId="Construction" boxContent="General Construction Technology" />
                <PreBuiltCheckbox boxId="Diesel" boxContent="Diesel Technology" />

              </div>
            </div>
          </fieldset>
            <input type="submit" value="Submit" />
            </fieldset>
        </form>

      </div>
      <div>
      
      </div>
    </div>
  )
}

export default AdminPage