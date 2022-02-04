import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Ticket = {};
type State = {
  events: Ticket[];
  event: Ticket | null;
};

const initialState: State = {
  events: [],
  event: null,
};

const events = createSlice({
  initialState,
  name: 'events',
  reducers: {
    setEvents: (state, action: PayloadAction<Ticket[]>) => {
      state.events = action.payload;
    },
    setEvent: (state, action: PayloadAction<Ticket>) => {
      state.event = action.payload;
    },
  },
});

export const { setEvents, setEvent, ...ticketActionsClient } = events.actions;
export default events.reducer;
