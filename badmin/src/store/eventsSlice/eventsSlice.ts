import { createSlice } from '@reduxjs/toolkit';

type State = {
  loading: boolean;
};

const initialState: State = {
  loading: false,
};

const events = createSlice({
  initialState,
  name: 'events',
  reducers: {},
});

// export const {} = events.actions;

export default events.reducer;
