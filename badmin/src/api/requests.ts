import requests from './api';
import { RequestAuth, ResponseAuth, User } from '../typings/types';

export const fetchRegister = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/register`, data);
export const fetchLogin = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/login`, data);
export const fetchLogout = () => requests.post<boolean>(`auth/logout`);

export const fetchUsers = () => requests.get<User[]>(`users`);
