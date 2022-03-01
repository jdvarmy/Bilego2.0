import requests from './api';
import { Event, RequestLogin, ResponsePostsType, ResponsePostType } from '../types/types';

export const login = (data: RequestLogin) => requests.post<string>('auth/login', data);

export const fetchEvents = () => requests.get<ResponsePostsType<Event[]>>(`events`);

export const fetchEventById = (id: string) => requests.get<ResponsePostType<Event>>(`events/${id}`);
