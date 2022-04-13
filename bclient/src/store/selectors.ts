import { RootStoreType } from './index';

const rootState = (state: RootStoreType) => state;

// EVENTS
export const eventsSelector = (state: RootStoreType) => rootState(state).events;

// USER
export const userSelector = (state: RootStoreType) => rootState(state).user;

// CALENDAR
export const calendarSelector = (state: RootStoreType) => rootState(state).calendar;

// MODES
export const modesSelector = (state: RootStoreType) => rootState(state).modes;
export const preferenceModeSelector = (state: RootStoreType) => modesSelector(state).preference;

// SLIDES
export const sliderSelector = (state: RootStoreType) => rootState(state).slider;

// TAXONOMY
export const taxonomySelector = (state: RootStoreType) => rootState(state).taxonomy;
