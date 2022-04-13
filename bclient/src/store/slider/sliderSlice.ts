import { Slide } from '../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ThunkActionType } from '../index';
import { asyncGetSlides } from './sliderThunk';

type State = {
  slides: Slide[];
};

const initialState: State = {
  slides: [],
};

const slider = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    setSlides: (state, action: PayloadAction<Slide[]>) => {
      state.slides = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.slider };
    },
  },
});

export const { setSlides } = slider.actions;
export default slider.reducer;

export const getSlidesClientSide = (): ThunkActionType => async (dispatch) => {
  try {
    await asyncGetSlides(dispatch);
  } catch (e) {
    console.log('getSlidesClientSide', e);
  }
};
