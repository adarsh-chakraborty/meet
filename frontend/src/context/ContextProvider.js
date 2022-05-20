import AppContext from './appContext';

import { useReducer, useEffect } from 'react';
import { SET_ACCESS_TOKEN } from './constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Constants
const defaultState = {
  token: null,
  isLoggedIn: 'pending',
  setAccessToken: () => {}
};

const appContextReducer = (state, action) => {
  switch (action.type) {
    case SET_ACCESS_TOKEN: {
      if (action.payload) {
        return { ...state, token: action.payload, isLoggedIn: true };
      }
      return { ...state, token: null, isLoggedIn: false };
    }
    default:
      return state;
  }
};
const ContextProvider = (props) => {
  const navigate = useNavigate();
  const [state, stateActionDispatch] = useReducer(
    appContextReducer,
    defaultState
  );

  // do async tasks
  useEffect(() => {
    // Request access Token
    const getNewAccessToken = async () => {
      try {
        const resp = await axios.post('/auth', {}, { withCredentials: true });
        setAccessToken(resp.data.token);
      } catch (err) {
        setAccessToken(null);
        // navigate('/login');
      }
    };

    getNewAccessToken();
  }, [navigate]);

  const setAccessToken = (payload) => {
    stateActionDispatch({ type: SET_ACCESS_TOKEN, payload });
  };
  // variables & function pointers
  const appContext = {
    token: state.token,
    isLoggedIn: state.isLoggedIn,
    setAccessToken
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
