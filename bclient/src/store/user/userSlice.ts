import { createSlice } from '@reduxjs/toolkit';
import { ThunkActionType } from '../index';
import { login } from '../../api/requests';
import { RequestLogin } from '../../types/types';

type State = {
  login: boolean;
  jwt: string | null;
  name: string | null;
};

const initialState: State = {
  login: false,
  jwt: null,
  name: null,
};

const user = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action) => {
      state.login = true;

      state.jwt = action.payload;
    },
    clearUser: (state) => {
      state.login = false;
      state.name = null;
    },
  },
});

export const { setUser, ...userActionsClient } = user.actions;
export default user.reducer;

export const loginClientSide =
  (userLoginData: RequestLogin): ThunkActionType =>
  async (dispatch) => {
    try {
      const { data } = await login(userLoginData);
      dispatch(setUser(data));
    } catch (e) {
      console.log('ERROR', e);
    }
  };
