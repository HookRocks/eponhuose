import React, {useState, useEffect} from 'react'

const EventProgramInfo=({tabbedMode}) => {
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
        EventProgramInfo
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, maiores.</p>
      </div>
    );
  }
}

export default EventProgramInfo