import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event } from '../../types/types';
import { ThunkActionType } from '../index';
import { fetchEventById, fetchEvents } from '../../api/requests';

type State = {
  events: Event[];
  event: Event | null;
};

const initialState: State = {
  events: [],
  event: null,
};

const events = createSlice({
  initialState,
  name: 'events',
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    setEvent: (state, action: PayloadAction<Event>) => {
      state.event = action.payload;
    },
  },
});

export const { setEvents, setEvent, ...eventActionsClient } = events.actions;
export default events.reducer;

export const getEventsClientSide = (): ThunkActionType => async (dispatch) => {
  try {
    const { data } = await fetchEvents();
    dispatch(setEvents(data.posts));
  } catch (e) {
    console.log('ERROR', e);
  }
};

export const getEventByIdClientSide =
  (id: string): ThunkActionType =>
  async (dispatch) => {
    try {
      const { data } = await fetchEventById(id);
      dispatch(setEvent(data.post));
    } catch (e) {
      console.log('ERROR', e);
    }
  };
