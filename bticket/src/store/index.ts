import { Action, AnyAction, applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware, { ThunkAction, ThunkDispatch } from 'redux-thunk';
import reducers from './store';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const rootReducer = combineReducers({ ...reducers });

const store = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count) nextState.count = state.count;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const initStore = () => {
  return createStore(store, bindMiddleware([thunkMiddleware]));
};

export type RootStateType = ReturnType<typeof rootReducer>;
export type ThunkActionType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, Action<string>>;
export type ThunkDispatchType = ThunkDispatch<RootStateType, void, AnyAction>;

export const wrapper = createWrapper<Store<RootStateType>>(initStore, { debug: true });
