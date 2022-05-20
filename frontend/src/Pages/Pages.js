import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import Error404 from './Error404';
import Call from './Call';

import AppContext from '../context/appContext';
import ProtectedRoutes from '../Components/ProtectedRoutes';
import PublicRoutes from '../Components/PublicRoutes';

const Pages = () => {
  const { isLoggedIn } = useContext(AppContext);
  console.log('BAAWW', isLoggedIn);
  return (
    <Routes>
      {/* Public Routes  */}
      <Route element={<PublicRoutes />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>

      {/* Protected Routes */}
      <Route element={<ProtectedRoutes />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/call" element={<Call />} />
      </Route>

      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Pages;
