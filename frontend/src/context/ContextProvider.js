import AppContext from './appContext';

import { useReducer, useEffect, useRef } from 'react';
import {
  SET_ACCESS_TOKEN,
  SET_PEER_ID,
  SET_PEER,
  SET_RECEIVING_CALL,
  SET_CALL_OBJECT
} from './constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';

// Constants
const defaultState = {
  token: null,
  isLoggedIn: 'pending',
  peerId: null,
  peer: null,
  isReceivingCall: false,
  call: null,
  setAccessToken: () => {},
  setReceivingCall: () => {}
};

const appContextReducer = (state, action) => {
  switch (action.type) {
    case SET_PEER_ID: {
      return { ...state, peerId: action.payload };
    }
    case SET_ACCESS_TOKEN: {
      if (action.payload) {
        return { ...state, token: action.payload, isLoggedIn: true };
      }
      return { ...state, token: null, isLoggedIn: false };
    }
    case SET_PEER: {
      return { ...state, peer: action.payload };
    }
    case SET_RECEIVING_CALL: {
      return { ...state, isReceivingCall: action.payload };
    }

    case SET_CALL_OBJECT: {
      return { ...state, call: action.payload };
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

  useEffect(() => {
    if (!state.token) return;
    const peer = new Peer({
      host: 'localhost',
      port: '9000',
      path: '/api',
      token: state.token
    });

    peer.on('open', (id) => {
      console.log('My Peer ID is: ', id);
      setPeerId(id);
    });

    // Answering the call, set our video and remote video
    peer.on('call', (call) => {
      console.log('Receiving a call');
      setReceivingCall(true);
      setCall(call);
    });

    setPeer(peer);
  }, [state.token]);

  const setPeerId = async (payload) => {
    stateActionDispatch({ type: SET_PEER_ID, payload });
  };

  const setPeer = async (payload) => {
    console.log('SETTING PEER', payload);
    stateActionDispatch({ type: SET_PEER, payload });
  };

  const setAccessToken = (payload) => {
    stateActionDispatch({ type: SET_ACCESS_TOKEN, payload });
  };

  const setReceivingCall = (payload) => {
    stateActionDispatch({ type: SET_RECEIVING_CALL, payload });
  };

  const setCall = (payload) => {
    stateActionDispatch({ type: SET_CALL_OBJECT, payload });
  };
  // variables & function pointers
  const appContext = {
    token: state.token,
    isLoggedIn: state.isLoggedIn,
    peerId: state.peerId,
    peer: state.peer,
    call: state.call,
    isReceivingCall: state.isReceivingCall,
    setAccessToken,
    setReceivingCall
  };

  return (
    <AppContext.Provider value={appContext}>
      {props.children}
    </AppContext.Provider>
  );
};

export default ContextProvider;
