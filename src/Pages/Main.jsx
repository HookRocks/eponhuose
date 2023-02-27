import React, {useState, useEffect} from 'react'
import EventProgramInfo from '../Components/EventProgramInfo'

const Main=() => {
  const [clicked,setClicked]=useState(false);
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
    <div className={windowWidth<640?`grid sm:grid-cols-[6fr_4fr] grid-rows-1 min-h-screen`:`grid  lg:${clicked?'grid-cols-[9fr_1fr] grid-rows-1 min-h-screen':'grid-cols-[6fr_4fr] grid-rows-1 min-h-screen'} `}>
      <div className={windowWidth<640? `${clicked?'':'flex text-center justify-center min-w-full font-extrabold text-2xl '} bg-pink-400 `:`bg-pink-400 w-full`} onClick={() => setClicked(!clicked)}>
        Map
      </div>
      <div onClick={() => setClicked(!clicked)} className={windowWidth<640?`fixed sm:static sm:block bg-green-400 w-full min-h-screen w-auto top-1/4 p-4 duration-500 transition ${clicked? 'translate-y-[33rem]':'translate-y-[-8rem]'}` : `static bg-green-400 min-h-screen w-full p-4 duration-500 transform` } >
        <EventProgramInfo className="border-2 border-black border-solid" tabbedMode={clicked? true:false} />
      </div>
    </div>
  )
}

export default Main