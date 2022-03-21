import { RootStoreType } from './index';

const rootState = (state: RootStoreType) => state;

// EVENTS
export const eventsSelector = (state: RootStoreType) => rootState(state).events;

// USER
export const userSelector = (state: RootStoreType) => rootState(state).user;

// CALENDAR
export const calendarSelector = (state: RootStoreType) => rootState(state).calendar;
