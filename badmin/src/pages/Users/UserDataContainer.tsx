import React, { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Grid } from '@mui/material';
import { PostStatus, UserRole } from '../../typings/enum';
import { MediaSelectData, User } from '../../typings/types';
import SaveUserButton from './elems/SaveUserButton';
import UserMainData from './elems/UserMainData';
import UserSubData from './elems/UserSubData';
import UserOrganizerData from './elems/UserOrganizerData';
import { usePostStatus } from '../../hooks/usePostStatus';
import { AppDispatch } from '../../store/store';
import { useDispatch } from 'react-redux';
import { getUser } from '../../store/usersSlice/usersSlice';

export type UserState = Omit<User, 'uid' | 'status' | 'avatar'> & {
  status: boolean;
  password: string;
  sendMail: boolean;
  avatar: string | MediaSelectData;
  uid?: string;
};

const initialState: UserState = {
  email: '',
  password: '',
  status: true,
  role: UserRole.subscriber,
  sendMail: false,
  avatar: '',
  name: '',
  surname: '',
  birthdate: null,
  phone: '',
  concertManagerInfo: '',
  concertManagerPercentage: 0,
};

const UserDataContainer = () => {
  const dispatch: AppDispatch = useDispatch();
  const [values, setValues] = useState<UserState>(initialState);
  const { status, uid } = usePostStatus();

  const isEdit = useMemo(() => status === PostStatus.edit && !!uid, [status, uid]);

  useEffect(() => {
    if (isEdit) {
      dispatch(getUser(uid as string, setValues));
    }
  }, [status, isEdit]);

  return (
    <>
      <Helmet>
        <title>{isEdit ? 'Редактирование' : 'Регистрация'} пользователя</title>
      </Helmet>
      <Grid container sx={{ my: 3 }} justifyContent='space-between' alignItems='center'>
        <Grid item />
        <Grid item>
          <SaveUserButton userData={values} uid={uid} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <UserMainData userData={values} setUserData={setValues} />
        </Grid>
        <Grid item xs={12}>
          <UserSubData userData={values} setUserData={setValues} />
        </Grid>
        {values.role === UserRole.organizer && (
          <Grid item xs={12}>
            <UserOrganizerData userData={values} setUserData={setValues} />
          </Grid>
        )}
      </Grid>
    </>
  );
};

export default UserDataContainer;
