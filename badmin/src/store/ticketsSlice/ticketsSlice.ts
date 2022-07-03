import { Ticket } from '../../typings/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { fetchTickets, requestSaveTickets } from '../../api/requests';

type State = {
  loading: boolean;
  selectedTicket?: Ticket;
  tickets: Ticket[] | null;
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
  },
});

export const { setLoading, setTickets } = tickets.actions;

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
  (dateUid: string, tickets: Ticket[]): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));

    try {
      const { data } = await requestSaveTickets(dateUid, tickets);
      dispatch(setTickets(data));
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
