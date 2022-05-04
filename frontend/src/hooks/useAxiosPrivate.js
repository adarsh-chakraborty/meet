import { axiosPrivate } from '../api/axios';

import { useEffect } from 'react';
import useRefreshToken from './useRefreshToken';
import axios from 'axios';

const useAxiosPrivate = () => {
  const resfresh = useRefreshToken();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization']) {
          config.headers['Authorization'] = `Bearer ${auth}`;
        }
      },
      (err) => Promise.reject(error)
    );
    const resIntercept = axiosPrivate.interceptors.response.use(
      (res) => res,
      async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 403 && !prevRequest?.sent) {
          prevRequest.sent = true;
          const newAccess = await resfresh();
          prevRequest.headers['Authorization'] = `Bearer ${newAccess}`;
          return axiosPrivate(prevRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
