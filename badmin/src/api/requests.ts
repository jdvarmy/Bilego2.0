import requests from './api';

// delete
export const requestTickets = (params: { id?: number; slug?: string }) => requests.get<any>(`tickets`, params);
