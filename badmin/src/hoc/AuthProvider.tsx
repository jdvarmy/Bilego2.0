import React, { ReactNode, useEffect } from 'react';
import { axiosBaseUrl, ResponseAuth, storageTokenName } from '../typings/types';
import { instance } from '../api/api';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { checkIsUserLogin } from '../store/authSlice/authSlice';
import { AppDispatch } from '../store/store';
import { useLocation, useNavigate } from 'react-router-dom';

instance.interceptors.request.use((request) => {
  if (request.headers) {
    const token = localStorage.getItem(storageTokenName);

    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
  }

  return request;
});

instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if ([401].includes(error.response?.status) && error.config && !error.config._isRetry) {
      originalRequest._isRetry = true;

      try {
        const { data } = await axios.get<ResponseAuth>(`${axiosBaseUrl}auth/refresh`, {
          withCredentials: true,
        });

        localStorage.setItem(storageTokenName, data.accessToken);

        return instance.request(originalRequest);
      } catch (e) {
        console.log(e);
      }
    }
  },
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    dispatch(checkIsUserLogin(navigate, location));
  }, [dispatch]);

  return <>{children}</>;
};

export default AuthProvider;
