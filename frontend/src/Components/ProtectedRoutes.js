import React, { useContext } from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';
import AppContext from '../context/appContext';
import Splash from '../Pages/Splash';

const ProtectedRoutes = () => {
  const { isLoggedIn } = useContext(AppContext);
  console.log(isLoggedIn);

  if (isLoggedIn === 'pending') {
    return <Splash />;
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
