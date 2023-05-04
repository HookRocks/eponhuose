import { createContext, useReducer } from 'react';

export const MarkerContext = createContext(null);
const markerStatesReducer = (state, action) => {
  switch (action.type) {
    case 'Marker Select': {
      const resizeEvent = new Event('resizeEvent');
    
      document.dispatchEvent(resizeEvent);
      return { ...state, marker: action.payload };
    }
    case 'Clicked': {
      const resizeEvent = new Event('resizeEvent');
    
      document.dispatchEvent(resizeEvent);
      return { ...state, clicked: action.payload };
    }
    default: {
      throw Error('Unknown Action');
    }
  }
};
export function MarkerProvider({ children }) {
  const [markerStates, dispatch] = useReducer(markerStatesReducer, {
    marker: '',
    clicked: true,
  });
  return (
    <MarkerContext.Provider value={{ markerStates, dispatch }}>
      {children}
    </MarkerContext.Provider>
  );
}
