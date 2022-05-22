import React from 'react';

const defaultContext = {
  token: null,
  isLoggedIn: 'pending',
  peerId: null,
  peer: null,
  isReceivingCall: false,
  setAccessToken: () => {}
};

const AppContext = React.createContext(defaultContext);

export default AppContext;
