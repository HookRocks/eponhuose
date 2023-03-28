import React,{useState,useEffect} from 'react'
import $ from 'jquery';
import PreBuiltCheckbox from '../Components/PreBuiltCheckbox';
import EventsList from '../Components/EventsList';
import Event from '../Components/Event';

const AdminPage=() => {
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);
    const [clicked,setClicked]=useState("")
  const [events,setEventList]=useState(["E"]);
  const [eventNameMade,setEventName]=useState();
  const [startDateMade,setStartDate]=useState();
  const [endDateMade,setEndDate]=useState("");
  const [programsMade,setPrograms]=useState([]);


  function toggle(divId, sourceCheckbox) {
    var divElement = document.getElementById(divId);
    var inputElements = divElement.getElementsByTagName('input');
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].type != 'checkbox')
            continue;
        inputElements[i].checked = sourceCheckbox.checked;
    }
}

function createEventButton(){
    fetch("http://localhost:3001/event/createEvent",{
      method: "POST",
      body: {
         eventName: eventNameMade,
         startDate: startDateMade,
         endDate: endDateMade
      }
    })
  }


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
      <form target='_self' method='get'>
          <fieldset className='border border-solid border-gray-300 p-3 rounded-lg'>
            <legend className='text-xl'>Create Event</legend>
            <div className='flex align-start justify-start flex-col gap-4'>
              <div><label className='text-lg'>Event Name: </label><input  onChange={(e)=>{setEventName(e.target.value)}} type="text" name="eventName" className='text-black' id="eventName" placeholder='Event Name' value={eventNameMade}/></div>
              <div><label className='text-lg'>Start Date and Time: </label><input  onChange={(e)=>{setStartDate(new Date(e.target.value).getTime())}} type="datetime-local" id="startTime" className='text-black' name="startTime"/></div>
                <div><label className='text-lg'>End Date and Time: </label><input onChange={(e) => {let a=new Date(e.target.value); setEndDate(a.getTime())}} type="datetime-local" id="endTime" className='text-black' name="endTime"/></div>
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
              <input type="submit" vlaue="Submit" onClick={(ev) => {ev.stopPropagation(); createEventButton();}}/>
            </fieldset>
        </form>
      </div>
      <div>
          <EventsList />
      </div>
      </div>
      
    </div>
  )
}

export default AdminPage