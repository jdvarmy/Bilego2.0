import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

type Store = {
  selectedDate: Date | number;
};

const initialState: Store = {
  selectedDate: Date.parse(new Date().toString()),
};

const calendar = createSlice({
  initialState,
  name: 'calendar',
  reducers: {
    setSelectedDate: (state, action: PayloadAction<Date | number>) => {
      if (typeof action.payload === 'number') {
        state.selectedDate = action.payload;
      } else {
        state.selectedDate = Date.parse(action.payload.toString());
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => {
      return { ...state };
    },
  },
});

export const { setSelectedDate } = calendar.actions;
export default calendar.reducer;
