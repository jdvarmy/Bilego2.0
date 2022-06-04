import requests from './api';
import { MediaFile, RequestAuth, ResponseAuth, User } from '../typings/types';

export const fetchRegister = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/register`, data);
export const fetchLogin = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/login`, data);
export const fetchLogout = () => requests.post<boolean>(`auth/logout`);

export const fetchUsers = () => requests.get<User[]>(`users`);
export const saveUserData = (data: RequestAuth) => requests.post<boolean>(`users/save`, data);
export const deleteUserData = (uid: string) => requests.delete<boolean>(`users/${uid}`);

export const fetchMedialibrary = () => requests.get<MediaFile[]>(`media`);
export const uploadFileMedialibrary = (data: FormData) => requests.post<boolean>(`media/upload`, data);
export const removeFileMedialibrary = (id: number) => requests.delete<boolean>(`media/${id}`);
