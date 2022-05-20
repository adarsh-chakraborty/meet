import React from 'react';

const defaultContext = {
  token: null,
  isLoggedIn: 'pending',
  setAccessToken: () => {}
};

const AppContext = React.createContext(defaultContext);

export default AppContext;
