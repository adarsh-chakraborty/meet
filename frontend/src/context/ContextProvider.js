import AppContext from './appContext';

import { useReducer, useEffect } from 'react';

// Constants

const defaultState = {};
const appContextReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const ContextProvider = (props) => {
  const [state, stateActionDispatch] = useReducer(
    appContextReducer,
    defaultState
  );

  // do async tasks
  useEffect(() => {}, []);

  // variables & function pointers
  const appContext = {};

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
