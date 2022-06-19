import requests from './api';
import { MediaFile, RequestAuth, RequestUser, ResponseAuth, User, Event, EventDate } from '../typings/types';

export const fetchRegister = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/register`, data);
export const fetchLogin = (data: RequestAuth) => requests.post<ResponseAuth>(`auth/login`, data);
export const fetchLogout = () => requests.post<boolean>(`auth/logout`);

export const fetchUser = (uid: string) => requests.get<User>(`users/${uid}`);
export const fetchUsers = () => requests.get<User[]>(`users`);
export const saveUserData = (data: RequestUser, uid?: string) => {
  if (uid) {
    return requests.put<boolean>(`users/save/${uid}`, data);
  }
  return requests.post<boolean>(`users/save`, data);
};
export const deleteUserData = (uid: string) => requests.delete<boolean>(`users/${uid}`);

export const fetchMedialibrary = () => requests.get<MediaFile[]>(`media`);
export const getFileMedialibrary = (id: number) => requests.get<MediaFile>(`media/${id}`);
export const uploadFileMedialibrary = (data: FormData) => requests.post<boolean>(`media/upload`, data);
export const removeFileMedialibrary = (id: number) => requests.delete<boolean>(`media/${id}`);

export const fetchEventData = (eventUid: string) => requests.get<Event>(`events/${eventUid}`);
export const saveTemplateEventData = () => requests.post<Event>(`events/save`);
export const saveEventData = (data: Event) => requests.put<Event>(`events/save`, data);
export const fetchEventDatesData = (eventUid: string) => requests.get<EventDate[]>(`events/${eventUid}/dates`);
export const requestSaveAddEventDate = (eventUid: string) => requests.post<EventDate>(`events/${eventUid}/dates`);
export const requestDeleteEventDate = (id: string, eventUid: string) =>
  requests.delete<boolean>(`events/${eventUid}/dates/${id}`);

export const fetchItemListForEvent = (data: any) => requests.get<Event['item'][]>(`items`, data);
export const fetchArtistListForEvent = (data: { search: string }, cfg: { signal: AbortSignal }) =>
  requests.get<Event['artist']>(`artists`, data, cfg);
