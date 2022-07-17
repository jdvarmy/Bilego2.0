import { Ticket } from '../../typings/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { fetchTickets, requestDeleteTickets, requestSaveTickets } from '../../api/requests';

type State = {
  loading: boolean;
  tickets: Ticket[] | null;
  selectedTicket?: Ticket | undefined;
};
const initialState: State = {
  loading: false,
  tickets: null,
  selectedTicket: undefined,
};

const tickets = createSlice({
  initialState,
  name: 'tickets',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setTickets: (state, action: PayloadAction<Ticket[] | null>) => {
      state.tickets = action.payload;
    },
    setSelectedTicket: (state, action: PayloadAction<Ticket | undefined>) => {
      state.selectedTicket = action.payload;
    },
  },
});

export const { setLoading, setTickets, setSelectedTicket } = tickets.actions;

export default tickets.reducer;

export const getTickets =
  (dateUid: string): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await fetchTickets(dateUid);
      dispatch(setTickets(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const saveTickets =
  (type: 'edit' | 'save', dateUid: string, tickets: Ticket[]): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await requestSaveTickets(type, dateUid, tickets);
      dispatch(setTickets(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const deleteTickets =
  (ticketsUid: string[]): AppThunk =>
  async (dispatch, getState) => {
    const dateUid = getState().events.selectedDateUid;
    if (!dateUid) {
      return;
    }

    dispatch(setLoading(true));

    try {
      await requestDeleteTickets(dateUid, ticketsUid);
      dispatch(getTickets(dateUid));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
