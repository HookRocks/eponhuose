import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import PreBuiltCheckbox from '../Components/PreBuiltCheckbox';
import EventsList from '../Components/EventsList';
import Event from '../Components/Event';
import { set } from 'mongoose';
import EventOverTimeGraph from '../Components/EventOverTimeGraph';
import Data from '../modules/Data';
// import EventOverTimeGraph from '../Components/EventOverTimeGraph';

const AdminPage = () => {
  const [isAllProgChecked, setIsAllProgChecked] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [clicked, setClicked] = useState('');
  const [events, setEventList] = useState([]);
  const [eventNameMade, setEventName] = useState();
  const [startDateMade, setStartDate] = useState();
  const [endDateMade, setEndDate] = useState('');
  const [programsMade, setPrograms] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ]);

  if (!sessionStorage.getItem('auth')) {
    sessionStorage.setItem('auth', prompt('Enter Admin Password:'));
  }
  useEffect(() => {
    fetch(`https://eponback-k6b6.onrender.com/event/getEndedEvents`, {
      method: 'POST',
      body: {},
      headers: {
        auth: sessionStorage.getItem('auth'),
      },
    }).then((eventList) => {
      console.log(eventList, 'among us');
      eventList.json().then((e) => {
        console.log(e);
        setEventList(e);
      });
    });
  }, []);

  useEffect(() => {
    console.log(events, 'sussy impos');
  }, [events]);

  const AllProgramFunc = useEffect(() => {
    var allChosen =
      programsMade.filter((val, ind) => val || ind == 11).length == 12;
    if (programsMade[11] != allChosen) {
      setPrograms(programsMade.map(() => allChosen));
    }
    console.log(programsMade);
  }, [programsMade]);

  function createEventButton() {
    fetch(`https://eponback-k6b6.onrender.com/event/createEvent`, {
      method: 'POST',
      body: JSON.stringify({
        eventName: eventNameMade,
        startDate: startDateMade,
        endDate: endDateMade,
        eventPrograms: programsMade,
      }),
      headers: {
        auth: sessionStorage.getItem('auth'),
      },
    });
  }

  useEffect(() => {
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);
  if (!sessionStorage.getItem('auth')) {
    sessionStorage.setItem('auth', prompt('ENTER ADMIN PASSWORD'));
  }
  return (
    <div
      className={
        windowWidth < 640
          ? ``
          : `grid lg:${
              clicked
                ? 'grid-cols-[9fr_1fr] grid-rows-1 min-h-screen'
                : 'grid-cols-[6fr_4fr] grid-rows-1 min-h-screen'
            } `
      }>
      <div className={windowWidth < 640 ? `hidden ` : `bg-neutral-900 w-full`}>
        {console.log(events, 'eeeeee')}
        <EventOverTimeGraph chartData={events /*should be eventList*/} />
      </div>

      <div className='static bg-neutral-700 min-h-screen w-full p-4 duration-500 transform text-white flex flex-col gap-6'>
        <div>
          <form target='_self' method='get'>
            <fieldset className='border border-solid border-gray-300 p-3 rounded-lg'>
              <legend className='text-xl'>Create Event</legend>
              <div className='flex align-start justify-start flex-col gap-4'>
                <div>
                  <label className='text-lg'>Event Name: </label>
                  <input
                    required
                    onChange={(e) => {
                      setEventName(e.target.value);
                      console.log('a');
                    }}
                    type='text'
                    name='eventName'
                    className='text-black'
                    id='eventName'
                    placeholder='Event Name'
                    value={eventNameMade}
                  />
                </div>
                <div>
                  <label className='text-lg'>Start Date and Time: </label>
                  <input
                    required
                    onChange={(e) => {
                      setStartDate(new Date(e.target.value).getTime());
                    }}
                    type='datetime-local'
                    id='startTime'
                    className='text-black'
                    name='startTime'
                  />
                </div>
                <div>
                  <label className='text-lg'>End Date and Time: </label>
                  <input
                    required
                    onChange={(e) => {
                      let a = new Date(e.target.value);
                      setEndDate(a.getTime());
                    }}
                    type='datetime-local'
                    id='endTime'
                    className='text-black'
                    name='endTime'
                  />
                </div>
              </div>
              <fieldset className='border border-solid border-gray-300 p-3 rounded-lg'>
                <legend className='text-lg'>Programs</legend>
                <PreBuiltCheckbox
                  boxId='select-all'
                  boxFunction={() => {
                    setIsAllProgChecked(!isAllProgChecked);
                    setPrograms(
                      programsMade.map((val, ind) => (ind == 11 ? !val : val))
                    );
                    if (programsMade[11]) {
                      setPrograms([
                        true,
                        true,
                        true,
                        true,
                        true,
                        true,
                        true,
                        true,
                        true,
                        true,
                        true,
                        true,
                      ]);
                    } else {
                      setPrograms([
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                        false,
                      ]);
                    }
                  }}
                  boxContent='All Programs'
                  className=''
                />
                <div className='flex align-center justify-center gap-x-9 mt-2 ml-3'>
                  <div
                    id='allClasses'
                    className='flex align-start justify-start flex-col'>
                    <PreBuiltCheckbox
                      boxId='Coding'
                      boxContent='Coding'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 0 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                      isCheckedAlready={programsMade[0]}
                    />
                    <PreBuiltCheckbox
                      boxId='HVAC'
                      boxContent='HVAC'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 2 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                    <PreBuiltCheckbox
                      boxId='ACTech'
                      boxContent='AC Technology'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 1 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                    <PreBuiltCheckbox
                      boxId='ElectricTradeSpecial'
                      boxContent='Electrical Trade Speciality'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 5 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                    <PreBuiltCheckbox
                      boxId='Pharmacy'
                      boxContent='Pharmacy Science'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 9 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                    <PreBuiltCheckbox
                      boxId='VetScience'
                      boxContent='Veterinary Science'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 10 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                  </div>
                  <div className='flex align-center justify-start flex-col'>
                    <PreBuiltCheckbox
                      boxId='MA'
                      boxContent='Medical Assisting'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 7 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                    <PreBuiltCheckbox
                      boxId='AutoTech'
                      boxContent='Automotive Technology'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 3 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                    <PreBuiltCheckbox
                      boxId='Collision'
                      boxContent='Collision Repair and Refinishing'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 4 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                    <PreBuiltCheckbox
                      boxId='Construction'
                      boxContent='General Construction Technology'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 6 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                    <PreBuiltCheckbox
                      boxId='Diesel'
                      boxContent='Diesel Technology'
                      boxFunction={() => {
                        setPrograms(
                          programsMade.map((val, ind) =>
                            ind == 8 ? !val : val
                          )
                        );
                        console.log(programsMade);
                      }}
                    />
                  </div>
                  {console.log(programsMade)}
                </div>
              </fieldset>
              <input
                type='submit'
                vlaue='Submit'
                onClick={(ev) => {
                  ev.stopPropagation();
                  createEventButton();
                }}
              />
            </fieldset>
          </form>
        </div>
        <div>
          <EventsList />
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
