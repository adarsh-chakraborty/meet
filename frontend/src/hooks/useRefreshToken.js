import React from 'react';
import axios from '../api/axios';

const useRefreshToken = () => {
  refresh = async () => {
    const res = await axios.get('/refresh', {
      withCredentials: true
    });
  };
  return <div>useRefreshToken</div>;
};

export default useRefreshToken;
