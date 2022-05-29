import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { axiosBaseUrl, RequestAuth, ResponseAuth, storageTokenName, User } from '../../typings/types';
import { AppThunk } from '../store';
import axios, { AxiosError } from 'axios';
import { fetchLogin, fetchLogout, fetchRegister } from '../../api/requests';
import { NavigateFunction, Location } from 'react-router-dom';

type State = {
  isAuthenticated: boolean;
  user: User | null;
};

const initialState: State = {
  isAuthenticated: false,
  user: null,
};

const user = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      const { user, accessToken } = action.payload;

      localStorage.setItem(storageTokenName, accessToken);

      return { ...state, isAuthenticated: true, user };
    },
    clearUser: (state) => {
      localStorage.removeItem(storageTokenName);

      return { ...state, isAuthenticated: false, user: null };
    },
  },
});

export const { setUser, clearUser } = user.actions;

export default user.reducer;

export const register =
  (userLoginData: RequestAuth): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await fetchRegister(userLoginData);

      dispatch(setUser(data));
    } catch (e) {
      console.log('register', e);
    }
  };
export const login =
  (userLoginData: RequestAuth): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await fetchLogin(userLoginData);

      dispatch(setUser(data));
    } catch (e) {
      console.log('login', e);
    }
  };
export const logout = (): AppThunk => async (dispatch) => {
  try {
    await fetchLogout();

    dispatch(clearUser());
  } catch (e) {
    console.log('logout', e);
  }
};
export const checkIsUserLogin =
  (navigate?: NavigateFunction, location?: Location): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await axios.get<ResponseAuth>(`${axiosBaseUrl}auth/refresh`, {
        withCredentials: true,
      });

      dispatch(setUser(data));
    } catch (e) {
      console.log('check', e);
      dispatch(clearUser);

      const { response } = e as AxiosError;
      if ([403].includes(response?.status || 0) && navigate && location) {
        navigate('login', { replace: false, state: { from: location.pathname || '/' } });
      }
    }
  };
