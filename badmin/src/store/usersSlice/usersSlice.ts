import { User } from '../../typings/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { fetchUsers } from '../../api/requests';

type State = {
  users: User[] | null;
};

const initialState: State = {
  users: null,
};

const users = createSlice({
  initialState,
  name: 'users',
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
  },
});

export const { setUsers } = users.actions;

export default users.reducer;

export const getUsers = (): AppThunk => async (dispatch) => {
  try {
    const { data } = await fetchUsers();

    dispatch(setUsers(data));
  } catch (e) {
    console.log(e);
  }
};
