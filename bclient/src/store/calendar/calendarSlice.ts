import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Store = {
  selectedDate: Date;
};

const initialState: Store = {
  selectedDate: new Date(),
};

const calendar = createSlice({
  initialState,
  name: 'calendar',
  reducers: {
    setSelectedDate: (state, action: PayloadAction<Date>) => {
      state.selectedDate = action.payload;
    },
  },
});

export const { setSelectedDate } = calendar.actions;
export default calendar.reducer;
