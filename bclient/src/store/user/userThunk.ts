import axios from 'axios';
import { User } from '../../types/types';
import { setUser } from './userSlice';
import { ThunkActionType } from '../index';

// todo: функция не передает куки на бек, надо разобраться
export const asyncCheckIsUserLogin =
  (context): ThunkActionType =>
  async (dispatch) => {
    try {
      if (context.req.cookies.refreshToken) {
        const { data } = await axios.get<{ user: User; accessToken: string }>(
          `${process.env.NEXT_PUBLIC_NEST_APP_API_ROOT}auth/refresh`,
          { withCredentials: true },
        );
        dispatch(setUser(data));
      }
    } catch (e) {
      console.log('asyncCheckIsUserLogin', e);
    }
  };
