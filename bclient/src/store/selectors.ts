import { RootStateType } from './index';

const rootState = (state: RootStateType) => state;

// EVENTS
export const eventsSelector = (state) => rootState(state).events;
