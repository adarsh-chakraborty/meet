import React from 'react';

const defaultContext = {
  token: null,
  isLoggedIn: 'pending',
  peerId: null,
  peer: null,
  call: null,
  isReceivingCall: false,
  setAccessToken: () => {},
  setReceivingCall: () => {}
};

const AppContext = React.createContext(defaultContext);

export default AppContext;
