import React,{useState,useEffect} from 'react'
import PreBuiltCheckbox from '../Components/PreBuiltCheckbox';

const AdminPage=() => {

  const [clicked,setClicked]=useState(false);
  const [windowWidth,setWindowWidth]=useState(window.innerWidth);


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
      <div className={windowWidth<640? `${clicked? '':'flex text-center justify-center min-w-full font-extrabold text-2xl '} bg-pink-400 `:`bg-pink-400 w-full`}>
        Map
      </div>
      <div className={windowWidth<640? ` text-white fixed sm:static sm:block bg-blue-600 w-full min-h-screen w-auto top-1/4 p-4 duration-500 transition ${clicked? 'translate-y-[33rem]':'translate-y-[-8rem]'}`:`static bg-blue-600 min-h-screen w-full p-4 duration-500 transform text-white `} style={{"paddingLeft":"auto", "paddingRight":"auto"}} >
        
        <form>
          <fieldset className='border border-solid border-gray-300 p-3 rounded-lg text-center w-80'>
            <legend>Programs</legend>
            <PreBuiltCheckbox boxId="" boxContent="All Programs" className=""/>
            <div className='flex align-center justify-center text-center gap-10 mt-2'>
              <div><PreBuiltCheckbox boxId="" boxContent="Coding" /></div>
              <div><PreBuiltCheckbox boxId="" boxContent="Medical Assisting" /></div>
            </div>
          </fieldset>
        </form>

      </div>
    </div>
  )
}

export default AdminPage