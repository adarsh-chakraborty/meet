import AppContext from './appContext';

import { useReducer, useEffect, useRef } from 'react';
import { SET_ACCESS_TOKEN, SET_PEER_ID } from './constants';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Peer from 'peerjs';

// Constants
const defaultState = {
  token: null,
  isLoggedIn: 'pending',
  peerId: null,
  setAccessToken: () => {}
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
  const peerInstance = useRef(null);

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
    // peer.on('call', (call) => {
    //   navigator.mediaDevices.getUserMedia({ video: true }, (mediaStream) => {
    //     localVideoRef.current.srcObject = mediaStream;
    //     localVideoRef.current.play();

    //     call.answer(mediaStream);
    //     call.on('stream', (remoteStream) => {
    //       remoteVideoRef.current.srcObject = remoteStream;
    //       remoteVideoRef.current.play();
    //     });
    //   });
    // });

    peerInstance.current = peer;
  }, [state.token]);

  const setPeerId = async (payload) => {
    stateActionDispatch({ type: SET_PEER_ID, payload });
  };

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
