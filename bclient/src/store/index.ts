import { Action, AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { createWrapper } from 'next-redux-wrapper';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import reducers from './store';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const makeStore = combineReducers({ ...reducers });

const store = (state, action) => {
  return makeStore(state, action);
  // if (action.type === HYDRATE) {
  //   const nextState = { ...state, ...action.payload };
  //
  //   if (state.count) {
  //     nextState.count = state.count;
  //   }
  //
  //   return nextState;
  // } else {
  //   return makeStore(state, action);
  // }
};

const initStore = () => {
  return createStore(store, bindMiddleware([thunkMiddleware]));
};

export type RootStoreType = ReturnType<typeof makeStore>;
export type ThunkActionType<ReturnType = void> = ThunkAction<ReturnType, RootStoreType, unknown, Action<string>>;
export type ThunkDispatchType = ThunkDispatch<RootStoreType, void, AnyAction>;

export const wrapper = createWrapper<Store<RootStoreType>>(initStore, { debug: true });
