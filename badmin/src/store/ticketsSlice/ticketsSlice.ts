import { Ticket } from '../../typings/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  selectedTicket?: Ticket;
  tickets: Ticket[] | null;
};
const initialState: State = {
  tickets: null,
  selectedTicket: undefined,
};

const tickets = createSlice({
  initialState,
  name: 'tickets',
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[] | null>) => {
      state.tickets = action.payload;
    },
  },
});

export const { setTickets } = tickets.actions;

export default tickets.reducer;
