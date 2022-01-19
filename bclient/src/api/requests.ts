import requests from './api';
import { Event, ResponsePostsType, ResponsePostType } from '../types/types';

export const fetchEvents = () => requests.get<ResponsePostsType<Event[]>>(`events`);

export const fetchEventById = (id: string) => requests.get<ResponsePostType<Event>>(`events/${id}`);
