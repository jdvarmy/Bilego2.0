import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Ticket } from '../../typings/types';

interface State {
  selected: Ticket[];
}

const initialState: State = {
  selected: [],
};

const tickets = createSlice({
  initialState,
  name: 'tickets',
  reducers: {
    addTicket: (state, action: PayloadAction<Ticket[]>) => {
      state.selected = action.payload;
    },
  },
});

const ticketsReducer = tickets.reducer;

export default ticketsReducer;

export const { addTicket } = tickets.actions;
