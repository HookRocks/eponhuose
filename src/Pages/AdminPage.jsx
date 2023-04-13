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
  const [programsMade,setPrograms]=useState([false,false,false,false,false,false,false,false,false,false,false]);


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
      body: JSON.stringify({
         eventName: eventNameMade,
         startDate: startDateMade,
        endDate: endDateMade,
         eventPrograms: programsMade,
      })
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
              <div><label className='text-lg'>Event Name: </label><input required onChange={(e)=>{setEventName(e.target.value)}} type="text" name="eventName" className='text-black' id="eventName" placeholder='Event Name' value={eventNameMade}/></div>
              <div><label className='text-lg'>Start Date and Time: </label><input required onChange={(e)=>{setStartDate(new Date(e.target.value).getTime())}} type="datetime-local" id="startTime" className='text-black' name="startTime"/></div>
                <div><label className='text-lg'>End Date and Time: </label><input required onChange={(e) => {let a=new Date(e.target.value); setEndDate(a.getTime())}} type="datetime-local" id="endTime" className='text-black' name="endTime"/></div>
              </div>
          <fieldset className='border border-solid border-gray-300 p-3 rounded-lg'>
            <legend className='text-lg'>Programs</legend>
                <PreBuiltCheckbox boxId="select-all" onClick={() => {toggle("allClasses",this)}} boxContent="All Programs" className="" />
            <div className='flex align-center justify-center gap-x-9 mt-2 ml-3'>
              <div id='allClasses' className='flex align-start justify-start flex-col'>
                    <PreBuiltCheckbox boxId="Coding" boxContent="Coding" onClick={() => {setPrograms(programsMade.map((val)=>val==0?!val:val)); console.log(programsMade)}} />
                <PreBuiltCheckbox boxId="HVAC" boxContent="HVAC" onClick={() => {setPrograms([!programsMade[1],...programsMade]); console.log(programsMade)}}/>
                <PreBuiltCheckbox boxId="ACTech" boxContent="AC Technology" onClick={() => {setPrograms([!programsMade[2],...programsMade]); console.log(programsMade)}}/>
                <PreBuiltCheckbox boxId="ElectricTradeSpecial" boxContent="Electrical Trade Speciality" onClick={() => {setPrograms([!programsMade[3],...programsMade]); console.log(programsMade)}}/>
                <PreBuiltCheckbox boxId="Pharmacy" boxContent="Pharmacy Science" onClick={() => {setPrograms([!programsMade[4],...programsMade]); console.log(programsMade)}}/>
                <PreBuiltCheckbox boxId="VetScience" boxContent="Veterinary Science" onClick={() => {setPrograms([!programsMade[5],...programsMade]); console.log(programsMade)}}/>
              </div>
              <div  className='flex align-center justify-start flex-col'>
                <PreBuiltCheckbox boxId="MA" boxContent="Medical Assisting" onClick={() => {setPrograms([!programsMade[6],...programsMade]); console.log(programsMade)}}/>
                <PreBuiltCheckbox boxId="AutoTech" boxContent="Automotive Technology" onClick={() => {setPrograms([!programsMade[7],...programsMade]); console.log(programsMade)}}/>
                <PreBuiltCheckbox boxId="Collision" boxContent="Collision Repair and Refinishing" onClick={() => {setPrograms([!programsMade[8],...programsMade]); console.log(programsMade)}}/>
                <PreBuiltCheckbox boxId="Construction" boxContent="General Construction Technology" onClick={() => {setPrograms([!programsMade[9],...programsMade]); console.log(programsMade)}}/>
                <PreBuiltCheckbox boxId="Diesel" boxContent="Diesel Technology" onClick={() => {setPrograms([!programsMade[10],...programsMade]); console.log(programsMade)}}/>
                  </div>
                  {console.log(programsMade)}
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