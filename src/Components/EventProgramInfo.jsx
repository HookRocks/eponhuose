/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import programInfo from '../modules/ProgramInfo.json';
import swal from '@sweetalert/with-react';
import AnimatedArrowButton from './AnimatedArrowButton';
import { MdArrowBackIos, MdArrowForwardIos } from 'react-icons/md';

const EventProgramInfo = ({ tabbedMode, givenProgramName }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [event, setEvent] = useState();

  const joinEvent = () => {
    console.log(event);
    if (localStorage.getItem('eventVisited') == event[0]._id) {
      return alert('You have already joined this event');
    }
    localStorage.setItem('eventVisited', event[0]._id);
    fetch('http://localhost:3001/users/visit', {
      method: 'POST',
      body: JSON.stringify({
        Filter: { _id: event[0]._id },
      }),
    });
  };
  useEffect(() => {
    fetch('http://localhost:3001/event/getEventList', {
      method: 'POST',
      body: {},
    }).then((eventList) => {
      console.log(eventList);
      eventList = eventList.json().then((e) => {
        setEvent(e);
      });
      console.log(event);
    });
  }, []);
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
    const handleWindowResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleWindowResize);

    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  });
  if (tabbedMode) {
    return (
      <div
        className={`${
          windowWidth < 640
            ? 'text-center grid'
            : 'flex align-middle items-center justify-center '
        }min-h-full font-extrabold text-2xl bg-[#4e57c1]`}>
        <h1 className={windowWidth < 640 ? `` : `transform rotate-[270deg]`}>
          Program Information
        </h1>
      </div>
    );
  } else {
    return (
      <div
        className={`h-full text-center align-center justify-center ${
          windowWidth < 640 ? ' z-50' : ' z-0'
        } `}>
        {givenProgramName != null || givenProgramName != '' ? (
          <div>
            <h1 className='font-bold text-xl'>{givenProgramName}</h1>
          </div>
        ) : (
          <b>program list</b>
        )}
        <div>
          {givenProgramName != null || givenProgramName != '' ? (
            <h1 className='font-bold'>
              {programInfo[givenProgramName].instructorName.join(', ')}
            </h1>
          ) : (
            <b>All Teachers and staff</b>
          )}
        </div>
        {event && event[0] != 'E' ? (
          <p className='font-bold'>{event[0].eventName}</p>
        ) : (
          <p>No Event Scheduled</p>
        )}
        {windowWidth < 640 ? (
          <button
            className='bg-[#f5a018] hover:bg-[#c18019] text-white font-bold py-2 px-4 rounded mt-3'
            onClick={(ev) => {
              ev.stopPropagation();
              document.dispatchEvent(new Event('Car'));
              fetch('http://localhost:3001/users/visit', {
                method: 'POST',
                body: JSON.stringify({
                  Filter: { _id: event[0]._id },
                }),
              });
            }}>
            <p>Visit event</p>
          </button>
        ) : (
          <div></div>
        )}

        {givenProgramName != null || givenProgramName != '' ? (
          <div className='w-full'>
            {programInfo[givenProgramName].POW.length > 1 ? (
              <div className='text-center'>
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handlePrevClick();
                  }}
                  className=' px-10 py-0.5 mt-2 mb-0.5 text-white text-center font-extrabold text-3xl rounded-3xl text-center bg-[#f5a018] hover:bg-[#c18019]'>
                  <div>
                    <MdArrowBackIos />
                  </div>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleNextClick();
                  }}
                  className='px-10 py-0.5 mt-2 mb-0.5 text-white text-center font-extrabold text-3xl rounded-3xl bg-[#f5a018] hover:bg-[#c18019'>
                  <div>
                    <MdArrowForwardIos />
                  </div>
                </button>
              </div>
            ) : (
              <div className='mb-4'></div>
            )}
            <iframe
              src={programInfo[givenProgramName].POW[currentIndex]}
              className='w-full h-[36rem] sm:h-[40rem]'
              title='POW'
            />
          </div>
        ) : (
          <h1>Please Select a Class</h1>
        )}
        {windowWidth > 640 ? (
          <button
            className='bg-[#f5a018] hover:bg-[#c18019] text-white font-bold py-2 px-4 rounded mt-3'
            onClick={(ev) => {
              ev.stopPropagation();
              joinEvent();
            }}>
            <a>Visit event</a>
          </button>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
};
export default EventProgramInfo;
