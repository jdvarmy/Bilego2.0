import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

type Store = {
  startDate: Date | number;
  endDate: Date | number;
};

const initialState: Store = {
  startDate: Date.parse(new Date().toString()),
  endDate: Date.parse(new Date().toString()),
};

const calendar = createSlice({
  initialState,
  name: 'calendar',
  reducers: {
    setOneDayDate: (state, action: PayloadAction<Date | number>) => {
      if (typeof action.payload === 'number') {
        state.startDate = action.payload;
        state.endDate = action.payload;
      } else {
        state.startDate = Date.parse(action.payload.toString());
        state.endDate = Date.parse(action.payload.toString());
      }
    },
    setStartDate: (state, action: PayloadAction<Date | number>) => {
      if (typeof action.payload === 'number') {
        state.startDate = action.payload;
      } else {
        state.startDate = Date.parse(action.payload.toString());
      }
    },
    setEndDate: (state, action: PayloadAction<Date | number>) => {
      if (typeof action.payload === 'number') {
        state.endDate = action.payload;
      } else {
        state.endDate = Date.parse(action.payload.toString());
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state) => {
      return { ...state };
    },
  },
});

export const { setOneDayDate, setStartDate, setEndDate } = calendar.actions;
export default calendar.reducer;
