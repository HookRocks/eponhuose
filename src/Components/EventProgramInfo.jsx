/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from 'react';
import programInfo from '../modules/ProgramInfo.json';
import swal from '@sweetalert/with-react';
import AnimatedArrowButton from './AnimatedArrowButton';

const EventProgramInfo = ({ tabbedMode, givenProgramName }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [event, setEvent] = useState();
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
        <p>
          {givenProgramName != null || givenProgramName != '' ? (
            <h1 className='font-bold'>
              {programInfo[givenProgramName].instructorName.join(', ')}
            </h1>
          ) : (
            <b>All Teachers and staff</b>
          )}
        </p>
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
            <a>Visit event</a>
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
                  className='arrow relative w-12 h-12 text-orange-600 font-extrabold text-4xl'>
                  <div className='arrow-left'>&lArr;</div>
                </button>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                  onClick={(ev) => {
                    ev.stopPropagation();
                    handleNextClick();
                  }}
                  className='arrow relative w-12 h-12 text-orange-600 font-extrabold text-4xl'>
                  <div className='arrow-right'>&rArr;</div>
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
              fetch('http://localhost:3001/users/visit', {
                method: 'POST',
                body: JSON.stringify({
                  Filter: { _id: event[0]._id },
                }),
              });
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
