import React, { useState, useEffect, useContext } from 'react';
import EventProgramInfo from '../Components/EventProgramInfo';
import Map from '../Components/Map';
import { MarkerContext } from '../Contexts/MarkerContext';

const Main = () => {
  // const programNAme
  const markerContext = useContext(MarkerContext);
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

  return (
    <div
      className={
        windowWidth < 640
          ? `grid sm:grid-cols-[6fr_4fr] grid-rows-1 min-h-screen`
          : `grid lg:${
              markerContext.markerStates.clicked
                ? 'grid-cols-[9fr_1fr] grid-rows-1 min-h-screen'
                : 'grid-cols-[6fr_4fr] grid-rows-1 min-h-screen'
            } `
      }>
      <div
        className={
          windowWidth < 640
            ? `${
                markerContext.markerStates.clicked
                  ? 'grid'
                  : 'grid text-center min-w-full font-extrabold text-2xl'
              } bg-[#cb7c15] grid`
            : `bg-[#cb7c15] grid`
        }>
        <Map />
      </div>
      <div
        className={
          windowWidth < 640
            ? ` text-white fixed sm:static sm:block bg-[#4e57c1] w-full h-full w-auto top-1/4 p-4 duration-700 transition ${
                markerContext.markerStates.clicked
                  ? 'translate-y-[60%]'
                  : '-translate-y-[25%]'
              }`
            : `static bg-[#4e57c1] min-h-screen w-full p-4 duration-500 transform text-white`
        }>
        <EventProgramInfo
          className='border-2 border-black border-solid'
          tabbedMode={markerContext.markerStates.clicked}
          givenProgramName={markerContext.markerStates.marker}
        />
      </div>
    </div>
  );
};

export default Main;
