import { createSlice } from '@reduxjs/toolkit';
import { ThunkActionType } from '../index';
import { login } from '../../api/requests';
import { RequestLogin } from '../../types/types';

type State = {
  login: boolean;
  name: string | null;
};

const initialState: State = {
  login: false,
  name: null,
};

const user = createSlice({
  initialState,
  name: 'user',
  reducers: {
    setUser: (state, action) => {
      state.login = true;

      state.name = action.payload;
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
      console.log(data);
      dispatch(setUser(data));
    } catch (e) {
      console.log('ERROR', e);
    }
  };
