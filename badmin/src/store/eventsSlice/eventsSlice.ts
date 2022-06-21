import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Event, EventDate } from '../../typings/types';
import { AppThunk } from '../store';
import {
  fetchEventData,
  requestDeleteEventDate,
  requestEditEventDate,
  requestSaveAddEventDate,
  saveEventData,
  saveTemplateEventData,
} from '../../api/requests';

export type EventStateFieldType = Record<keyof Event, any>;
type State = {
  loading: boolean;
  eventState: Event | null;
  events: Event[] | null;
  selectedDateId?: number;
};

const initialState: State = {
  loading: false,
  eventState: null,
  events: null,
  selectedDateId: undefined,
};

const events = createSlice({
  initialState,
  name: 'events',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setEventState: (state, action: PayloadAction<Event | null>) => {
      state.eventState = action.payload;
    },
    setEventStateField: (state, action: PayloadAction<EventStateFieldType>) => {
      state.eventState = { ...state.eventState, ...action.payload };
    },
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    setSelectedDateId: (state, action: PayloadAction<number | undefined>) => {
      state.selectedDateId = action.payload;
    },
  },
});

export const { setLoading, setEventState, setEvents, setEventStateField, setSelectedDateId } = events.actions;

export default events.reducer;

export const getEventByUid =
  (slug: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await fetchEventData(slug);
      dispatch(setEventState(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const saveTemplateEvent = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));

  try {
    const { data } = await saveTemplateEventData();
    dispatch(setEventState(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const saveEvent =
  (event: Event): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await saveEventData(event);
      dispatch(setEventState(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const saveTemplateEventDate =
  (eventUid: string): AppThunk =>
  async (dispatch, getState) => {
    dispatch(setLoading(true));
    const eventDates = getState().events.eventState?.eventDates || [];

    try {
      const { data } = await requestSaveAddEventDate(eventUid);
      dispatch(setEventStateField({ eventDates: [...eventDates, data] } as EventStateFieldType));
      dispatch(setSelectedDateId(data.id));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteEventDate =
  (id: number, eventUid: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      await requestDeleteEventDate(id, eventUid);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const editEventDate =
  (id: number, reqData: Partial<EventDate>): AppThunk =>
  async (dispatch, getState) => {
    const { eventState } = getState().events;
    dispatch(setLoading(true));

    try {
      if (!eventState?.uid) {
        return;
      }
      const { data } = await requestEditEventDate(eventState.uid, { ...reqData, id: +id });

      const localEventDates = eventState?.eventDates?.map((d) => {
        if (d.id === data.id) {
          return data;
        }
        return d;
      });
      dispatch(setEventStateField({ eventDates: localEventDates } as EventStateFieldType));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
