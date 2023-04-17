import React from 'react';
import { useEffect } from 'react';
import Experience from '../Experience/Experience';

function Map() {
  useEffect(() => {
    const experience = new Experience(
      document.querySelector('.experience-canvas')
    );
  }, []);
  return (
    <>
      <div className='experience'>
        <canvas className='experience-canvas'></canvas>
      </div>
      <div className='buttons'>
        <button className='back'>
          <i className='fa-solid fa-arrow-left'></i>
        </button>
        <button className='repeat'>
          <i className='fa-solid fa-rotate-left'></i>
        </button>
      </div>
      <div className='instructions'>
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
      </div>
      <div className='loader__wrapper'>
        <p className='loader__wrapper__items'>Loaded Resource 0 / 35</p>
      </div>
    </>
  );
}

export default Map;
