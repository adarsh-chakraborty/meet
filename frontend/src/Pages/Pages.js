import React from 'react';
import { Routes, Route } from 'react-router-dom';

import HomePage from './HomePage';
import Login from './Login';
import Signup from './Signup';
import Error404 from './Error404';
import Call from './Call';

const Pages = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/call" element={<Call />} />
      <Route path="*" element={<Error404 />} />
    </Routes>
  );
};

export default Pages;
