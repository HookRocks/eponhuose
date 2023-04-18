import { createContext, useReducer } from 'react';

export const MarkerContext = createContext(null);
const markerStatesReducer = (state, action) => {
  switch (action.type) {
    case 'Marker Select': {
      return action.payload;
    }
    default: {
      throw Error('Unknown Action');
    }
  }
};
export function MarkerProvider({ children }) {
  const [markerStates, dispatch] = useReducer(markerStatesReducer, '');
  return (
    <MarkerContext.Provider value={{ markerStates, dispatch }}>
      {children}
    </MarkerContext.Provider>
  );
}
