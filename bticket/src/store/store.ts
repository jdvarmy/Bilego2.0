import { Action, configureStore, ThunkAction } from '@reduxjs/toolkit';
import ticketsReducer from './ticketsSlice/ticketsSlice';
import thunk from 'redux-thunk';

const reducer = {
  tickets: ticketsReducer,
};

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
