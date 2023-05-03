import React from 'react';
import { useEffect, useContext, useState } from 'react';
import { MarkerContext } from '../Contexts/MarkerContext';
import Experience from '../Experience/Experience';

function Map() {
  const markerContext=useContext(MarkerContext);
  useEffect(() => {
    const experience = new Experience(
      document.querySelector('.experience-canvas'),
      markerContext
    );
  }, []);
  useEffect(() => {
    const resizeEvent = new Event('resizeEvent');
    document.dispatchEvent(resizeEvent);
  },[markerContext]);
  
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
    <div>
      <div className='experience'>
        <canvas className='experience-canvas'></canvas>
      </div>
      {windowWidth <640?(      <div className='buttons'>
        <button className='back'>
          <i className='fa-solid fa-arrow-left'></i>
        </button>
        <button className='repeat'>
          <i className='fa-solid fa-rotate-left'></i>
        </button>
      </div>):(      <div className='buttons'>
        <button className='back'>
          <i className='fa-solid fa-arrow-left'></i>
        </button>
        <button className='repeat'>
          <i className='fa-solid fa-rotate-left'></i>
        </button>
      </div>)}

      {windowWidth < 640?(<div></div>):(<div className='instructions'>
        <div className='mice'>
          <div className='mouse-wrapper'>
            Rotate
            <img
              src='mice/lmb.png'
              alt='Left Mouse Button'
              className='mouse-image'
            />
          </div>
          <div className='mouse-wrapper'>
            Pan
            <img
              src='mice/rmb.png'
              alt='Right Mouse Button'
              className='mouse-image'
            />
          </div>
          <div className='mouse-wrapper'>
            Zoom
            <img
              src='mice/mmb.png'
              alt='Middle Mouse Button'
              className='mouse-image'
            />
          </div>
        </div>
        <h2 className='learn-more'>Click on a Marker to Learn More</h2>
      </div>)}
      <div className='loader__wrapper'>
        <p className='loader__wrapper__items'>Loaded Resource 0 / 35</p>
      </div>
    </div>
  );
}

export default Map;
