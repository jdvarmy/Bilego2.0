import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThunkActionType } from '../index';
import { login, logout } from '../../api/requests';
import { RequestLogin, storageTokenName, User } from '../../types/types';
import axios from 'axios';
import { baseConfig } from '../../api/api';

type State = {
  isLogin: boolean;
  user: User | null;
};

const initialState: State = {
  isLogin: false,
  user: null,
};

const setToken = (accessToken) => {
  localStorage.setItem(storageTokenName, accessToken);
};
const removeToken = () => {
  localStorage.removeItem(storageTokenName);
};

const user = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action: PayloadAction<{ user: User; accessToken: string }>) => {
      const { user, accessToken } = action.payload;

      state.isLogin = true;
      state.user = user;

      setToken(accessToken);
    },
    clearUser: (state) => {
      state.isLogin = false;
      state.user = null;

      removeToken();
    },
  },
});

export const { setUser, clearUser } = user.actions;
export default user.reducer;

export const loginClientSide =
  (userLoginData: RequestLogin): ThunkActionType =>
  async (dispatch) => {
    try {
      const { data } = await login(userLoginData);

      dispatch(setUser(data));
    } catch (e) {
      console.log('login', e);
    }
  };
export const logoutClientSide = (): ThunkActionType => async (dispatch) => {
  try {
    await logout();

    dispatch(clearUser());
  } catch (e) {
    console.log('logout', e);
  }
};
export const checkIsUserLoginClientSide = (): ThunkActionType => async (dispatch) => {
  try {
    const { data } = await axios.get<{ user: User; accessToken: string }>(
      `${process.env.NEXT_PUBLIC_NEST_APP_API_ROOT}auth/refresh`,
      baseConfig,
    );

    dispatch(setUser(data));
  } catch (e) {
    console.log('check', e);
  }
};
