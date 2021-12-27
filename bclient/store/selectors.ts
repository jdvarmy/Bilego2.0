import { RootStateType } from './store';

const rootState = (state: RootStateType) => state;
export const eventsSelector = (state) => rootState(state).events;
