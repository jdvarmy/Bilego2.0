import { RootState } from './store';

export const select = (state: RootState) => state;

export const selectTickets = (state: RootState) => select(state)?.tickets;
export const selectSelectedTickets = (state: RootState) => selectTickets(state)?.selected;
