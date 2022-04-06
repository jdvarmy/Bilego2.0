import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type State = {
  modePreferenceOn: boolean;
};

const initialState: State = {
  modePreferenceOn: false,
};

const modePreference = createSlice({
  initialState,
  name: 'mode preference',
  reducers: {
    setModePreference: (state, action: PayloadAction<boolean>) => {
      state.modePreferenceOn = action.payload;
    },
  },
});

export const { setModePreference } = modePreference.actions;
export default modePreference.reducer;
