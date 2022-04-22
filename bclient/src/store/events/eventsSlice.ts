import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../types/types';
import { ThunkActionType } from '../index';
import { HYDRATE } from 'next-redux-wrapper';
import { asyncGetEventById, asyncGetEvents } from './eventsThunk';

type State = {
  mainPageEventsWeekend: Event[];
  mainPageEventsUpcoming: Event[];
  events: Event[];
  event: Event | null;
};

const initialState: State = {
  mainPageEventsWeekend: [],
  mainPageEventsUpcoming: [],
  events: [],
  event: null,
};

const events = createSlice({
  initialState,
  name: 'events',
  reducers: {
    setMainPageEventsWeekend: (state, action: PayloadAction<Event[]>) => {
      state.mainPageEventsWeekend = action.payload;
    },
    setMainPageEventsUpcoming: (state, action: PayloadAction<Event[]>) => {
      state.mainPageEventsUpcoming = action.payload;
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    setEvent: (state, action: PayloadAction<Event>) => {
      state.event = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.events };
    },
  },
});

export const { setEvents, setEvent } = events.actions;
export default events.reducer;

export const getEventsClientSide = (): ThunkActionType => async (dispatch) => {
  try {
    await asyncGetEvents(dispatch);
  } catch (e) {
    console.log('getEventsClientSide', e);
  }
};

export const getEventByIdClientSide =
  (id: string): ThunkActionType =>
  async (dispatch) => {
    try {
      await asyncGetEventById(dispatch, id);
    } catch (e) {
      console.log('getEventByIdClientSide', e);
    }
  };
