import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import AppContext from '../context/appContext';

import Splash from '../Pages/Splash';

const PublicRoutes = ({ children }) => {
  const { isLoggedIn } = useContext(AppContext);

  if (isLoggedIn === 'pending') {
    return <Splash />;
  }

  console.log('Hiii', isLoggedIn);
  console.log(Outlet);

  return isLoggedIn ? <Navigate to="/" replace /> : <Outlet />;
};

export default PublicRoutes;
