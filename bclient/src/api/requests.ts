import requests from './api';
import { Event, RequestLogin, RequestRegister, ResponsePostsType, ResponsePostType, User } from '../types/types';

export const register = (data: RequestRegister) =>
  requests.post<{ user: User; accessToken: string }>('auth/register', data);
export const login = (data: RequestLogin) => requests.post<{ user: User; accessToken: string }>('auth/login', data);
export const logout = () => requests.post<void>('auth/logout');

export const fetchEvents = () => requests.get<ResponsePostsType<Event[]>>(`events`);
export const fetchEventById = (id: string) => requests.get<ResponsePostType<Event>>(`events/${id}`);
