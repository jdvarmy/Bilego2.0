import { Cities } from '../../types/enums';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

type State = {
  city: Cities | null;
};

const initialState: State = {
  city: null,
};

const global = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setCity: (state, action: PayloadAction<Cities>) => {
      state.city = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.global };
    },
  },
});

export const { setCity } = global.actions;
export default global.reducer;
