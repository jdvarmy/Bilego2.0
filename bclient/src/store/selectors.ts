import { RootStateType } from './index';

const rootState = (state: RootStateType) => state;

// EVENTS
export const eventsSelector = (state: RootStateType) => rootState(state).events;

// USER
export const userSelector = (state: RootStateType) => rootState(state).user;
