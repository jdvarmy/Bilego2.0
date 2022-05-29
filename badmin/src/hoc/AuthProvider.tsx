import React, { ReactNode, useEffect } from 'react';
import { axiosBaseUrl, loginPage, ResponseAuth, storageTokenName } from '../typings/types';
import { instance } from '../api/api';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { checkIsUserLogin } from '../store/authSlice/authSlice';
import { AppDispatch } from '../store/store';
import { selectAuth } from '../store/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';

const Blur = styled('div')(
  () => `
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    filter: blur(2px);
`,
);

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
    if ([403].includes(error.response?.status) && error.config && !error.config._isRetry) {
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
  const { isAuthenticated, loading } = useSelector(selectAuth);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const toLogin = () => navigate(loginPage);

  useEffect(() => {
    dispatch(checkIsUserLogin(toLogin));
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated && !loading && pathname === '/login') {
      navigate('/');
    }
  }, [isAuthenticated]);

  return loading ? <Blur>{children}</Blur> : <>{children}</>;
};

export default AuthProvider;
