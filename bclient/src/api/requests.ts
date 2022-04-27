import requests from './api';
import * as queryString from 'query-string';
import {
  Event,
  ParametersType,
  RequestLogin,
  RequestRegister,
  ResponsePostsType,
  ResponsePostType,
  ResponseTaxonomies,
  Slide,
  User,
} from '../types/types';
import { Cities } from '../types/enums';

export const register = (data: RequestRegister) =>
  requests.post<{ user: User; accessToken: string }>('auth/register', data);
export const login = (data: RequestLogin) => requests.post<{ user: User; accessToken: string }>('auth/login', data);
export const logout = () => requests.post<void>('auth/logout');

export const fetchSlides = (city?: Cities | null) => requests.get<Slide[]>(`slides${city ? `?c=${city}` : ''}`);

export const fetchEvents = (
  params?: Omit<ParametersType, 'include' | 'exclude'> & Partial<{ include: string; exclude: string }>,
) =>
  requests.get<ResponsePostsType<Event[]>>(
    params && Object.keys(params).length ? `events/?${queryString.stringify(params)}` : `events`,
  );
export const fetchEventById = (id: string) => requests.get<ResponsePostType<Event>>(`events/${id}`);

export const fetchTaxonomies = () => requests.get<ResponseTaxonomies>(`taxonomy`);
