import { createSlice } from '@reduxjs/toolkit';

type State = {
  items: string;
};

const initialState: State = {
  items: '',
};

const events = createSlice({
  initialState,
  name: 'events',
  reducers: {
    setEvents: (state, action) => {
      state.items = action.payload;
    },
  },
});

export const { ...eventActions } = events.actions;
export default events.reducer;
