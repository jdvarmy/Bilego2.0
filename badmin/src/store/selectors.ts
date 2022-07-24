import { RootState } from './store';

export const select = (state: RootState) => state;

export const selectSidebar = (state: RootState) => select(state)?.sidebar;

export const selectAuth = (state: RootState) => select(state)?.auth;

export const selectUsers = (state: RootState) => select(state)?.users;

export const selectMedialibrary = (state: RootState) => select(state)?.medialibrary;

export const selectAlert = (state: RootState) => select(state)?.alert;

export const selectEventsStore = (state: RootState) => select(state)?.events;
export const selectEvent = (state: RootState) => selectEventsStore(state).eventState;
export const selectEvents = (state: RootState) => selectEventsStore(state).events;
export const selectEventSelectedDate = (state: RootState) => {
  const selected = selectEventsStore(state).selectedDateUid;
  return selectEventsStore(state).eventState?.eventDates?.find((date) => date.uid === selected);
};
export const selectSelectedDateMap = (state: RootState) => selectEventSelectedDate(state)?.map;
export const selectEventSelectedDateUid = (state: RootState) => selectEventsStore(state).selectedDateUid;

export const selectTicketsStore = (state: RootState) => select(state)?.tickets;
