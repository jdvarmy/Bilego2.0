import { RequestUser, User } from '../../typings/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { deleteUserData, fetchUser, fetchUsers, getFileMedialibrary, saveUserData } from '../../api/requests';
import { UserState } from '../../pages/Users/UserDataContainer';
import { Dispatch, SetStateAction } from 'react';

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

export const getUser =
  (uid: string, setUser: Dispatch<SetStateAction<UserState>>): AppThunk =>
  async () => {
    try {
      const { data } = await fetchUser(uid);

      const { access: _access, uid: _uid, status, avatar, ...user } = data;
      setUser((prev: UserState) => ({
        ...prev,
        ...user,
        status: Boolean(status),
        avatar: avatar ? { id: +avatar.id, name: avatar.name } : '',
      }));
    } catch (e) {
      console.log(e);
    }
  };

export const saveUser =
  (userData: RequestUser, navigateToUsers: () => void, uid?: string): AppThunk =>
  async () => {
    try {
      const { data } = await saveUserData(userData, uid);
      if (data) {
        navigateToUsers();
      }
    } catch (e) {
      console.log(e);
    }
  };

export const deleteUser =
  (uid: string): AppThunk =>
  async (dispatch) => {
    try {
      const { data } = await deleteUserData(uid);

      if (data) {
        dispatch(getUsers());
      }
    } catch (e) {
      console.log(e);
    }
  };
