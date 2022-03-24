import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  modeOn: boolean;
};

const initialState: State = {
  modeOn: false,
};

const modePreference = createSlice({
  initialState,
  name: 'mode preference',
  reducers: {
    setMode: (state, action: PayloadAction<boolean>) => {
      state.modeOn = action.payload;
    },
  },
});

export const { setMode } = modePreference.actions;
export default modePreference.reducer;
