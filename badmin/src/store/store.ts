import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import sidebarSlice from './sidebarSlice/sidebarSlice';
import eventsSlice from './eventsSlice/eventsSlice';

const reducer = {
  sidebar: sidebarSlice,
  events: eventsSlice,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
