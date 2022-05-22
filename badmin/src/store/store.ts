import { Action, combineReducers, configureStore, ThunkAction } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import sidebarSlice from './sidebarSlice/sidebarSlice';
import eventsSlice from './eventsSlice/eventsSlice';
import authSlice from './authSlice/authSlice';

const reducer = combineReducers({
  sidebar: sidebarSlice,
  auth: authSlice,
  events: eventsSlice,
});

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
