import requests from './api';
import { Ticket } from '../typings/types';

export const requestTickets = (params: { id?: number; slug?: string }) => requests.get<Ticket[]>(`tickets`, params);
