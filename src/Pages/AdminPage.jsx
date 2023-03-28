import React,{useState,useEffect} from 'react'
import $ from 'jquery';
import PreBuiltCheckbox from '../Components/PreBuiltCheckbox';
import EventsList from '../Components/EventsList';
import Event from '../Components/Event';

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
    <div className={windowWidth<640?``:`grid  lg:${clicked?'grid-cols-[9fr_1fr] grid-rows-1 min-h-screen':'grid-cols-[6fr_4fr] grid-rows-1 min-h-screen'} `}>
      <div className={windowWidth<640? `hidden `:`bg-pink-400 w-full`}>
        Map
      </div>


      <div className="static bg-blue-600 min-h-screen w-full p-4 duration-500 transform text-white flex flex-col gap-6" >
    <div>
      <form action='/admin/submited' target='_self' method='get'>
          <fieldset className='border border-solid border-gray-300 p-3 rounded-lg'>
            <legend className='text-xl'>Create Event</legend>
            <div className='flex align-start justify-start flex-col gap-4'>
              <div><label className='text-lg'>Event Name: </label><input type="text" name="eventName" className='text-black' id="eventName" placeholder='Event Name' /></div>
              <div><label className='text-lg'>Start Date and Time: </label><input type="datetime-local" id="startTime" className='text-black' name="startTime"/></div>
              <div><label className='text-lg'>End Date and Time: </label><input type="datetime-local" id="endTime" className='text-black' name="endTime"/></div>
            </div>
          <fieldset className='border border-solid border-gray-300 p-3 rounded-lg'>
            <legend className='text-lg'>Programs</legend>
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
          {/* <EventsList /> */}
           <Event eventName="Open House" eventStartDate="3/27/2023" eventEndDate="3/27/2023"/>
      </div>
      </div>
      
    </div>
  )
}

export default AdminPage