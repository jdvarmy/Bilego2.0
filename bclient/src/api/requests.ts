import requests from './api';
import * as queryString from 'query-string';
import {
  Event,
  RequestLogin,
  RequestRegister,
  ResponsePostsType,
  ResponsePostType,
  ResponseTaxonomies,
  Slide,
  User,
} from '../types/types';
import { EventsBlockProps } from '../components/Blocks/EventsBlock';
import { Cities } from '../types/enums';

export const register = (data: RequestRegister) =>
  requests.post<{ user: User; accessToken: string }>('auth/register', data);
export const login = (data: RequestLogin) => requests.post<{ user: User; accessToken: string }>('auth/login', data);
export const logout = () => requests.post<void>('auth/logout');

export const fetchSlides = (city?: Cities | null) => requests.get<Slide[]>(`slides${city ? `?c=${city}` : ''}`);

export const fetchEventsBlock = (params: EventsBlockProps['parameters']) =>
  requests.get<Event[]>(`events/?${queryString.stringify(params)}`);
export const fetchEvents = () => requests.get<ResponsePostsType<Event[]>>(`events`);
export const fetchEventById = (id: string) => requests.get<ResponsePostType<Event>>(`events/${id}`);

export const fetchTaxonomies = () => requests.get<ResponseTaxonomies>(`taxonomy`);
