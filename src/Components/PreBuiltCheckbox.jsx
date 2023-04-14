/* eslint-disable react-hooks/rules-of-hooks */
import React,{useState,useContext} from 'react'
import '../AdminPage.module.css'
import {
  animated,
  useSpring,
  config,
  useSpringRef,
  useChain
} from "react-spring";

const PreBuiltCheckbox=({boxId, boxContent, boxFunction,isCheckedAlready}) => {
  const [isChecked,setIsChecked]=useState(isCheckedAlready);
  const checkboxAnimationRef = useSpringRef();
  const checkboxAnimationStyle = useSpring({
    backgroundColor: isChecked ? "#808" : "#fff",
    borderColor: isChecked ? "#808" : "#ddd",
    config: config.gentle,
    ref: checkboxAnimationRef
  });

  const [checkmarkLength, setCheckmarkLength] = useState(null);

  const checkmarkAnimationRef = useSpringRef();
  const checkmarkAnimationStyle = useSpring({
    x: isChecked ? 0 : checkmarkLength,
    config: config.gentle,
    ref: checkmarkAnimationRef
  });

  useChain(
    isChecked
      ? [checkboxAnimationRef, checkmarkAnimationRef]
      : [checkmarkAnimationRef, checkboxAnimationRef],
    [0, 0.1]
  );
  return (
    <label className='align-center'>
      <input
        type="checkbox"
        name={boxId}
        value={isChecked}
        id={boxId}
        onChange={() => {
          
          setIsChecked(!isChecked);
          boxFunction();
              }}
              className="inline-block"
      />
      <animated.svg
        style={checkboxAnimationStyle}
        className={`inline-block mr-1 checkbox ${isChecked ? "checkbox--active" : ""} w-5 h-5 rounded-sm`}
        // This element is purely decorative so
        // we hide it for screen readers
        aria-hidden="true"
        viewBox="0 0 15 11"
        fill="none"
      >
        <animated.path
          d="M1 4.5L5 9L14 1"
          strokeWidth="2"
          stroke="#fff"
          ref={(ref) => {
            if (ref) {
              setCheckmarkLength(ref.getTotalLength());
            }
          }}
          strokeDasharray={checkmarkLength}
          strokeDashoffset={checkmarkAnimationStyle.x}
        />
            </animated.svg>
              {boxContent}
    </label>
  )
}

export default PreBuiltCheckbox