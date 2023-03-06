import React from 'react';

const AnimatedArrowButton=({direction='right'}) => {
  const baseClasses =
    'w-12 h-12 rounded-full border-2 border-gray-400 flex items-center justify-center transition-all duration-300';
  const arrowClasses =
    'w-3 h-3 border-t-2 border-r-2 transform transition-all duration-300';

  return (
    <button
      className={`${baseClasses} hover:bg-gray-400 hover:border-gray-500`}
    >
      <span
        className={`${arrowClasses} ${
          direction === 'right'
            ? 'rotate-45 -translate-x-1'
            : '-rotate-45 translate-x-1'
        }`}
      />
      <span
        className={`${arrowClasses} ${
          direction === 'right'
            ? '-rotate-45 translate-x-1'
            : 'rotate-45 -translate-x-1'
        }`}
      />
    </button>
  );
};

export default AnimatedArrowButton;