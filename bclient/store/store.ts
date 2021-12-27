import { applyMiddleware, combineReducers, createStore, Store } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import thunkMiddleware from 'redux-thunk';
import eventsSlice from './events/eventsSlice';

const bindMiddleware = (middleware) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const rootReducer = combineReducers({ events: eventsSlice });

const store = (state, action) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    if (state.count.count) nextState.count.count = state.count.count;
    return nextState;
  } else {
    return rootReducer(state, action);
  }
};

const initStore = () => {
  return createStore(store, bindMiddleware([thunkMiddleware]));
};

export type RootStateType = ReturnType<typeof rootReducer>;
export const wrapper = createWrapper<Store<RootStateType>>(initStore, { debug: true });
