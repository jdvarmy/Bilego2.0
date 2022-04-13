import { Category, Feeling, Genre, Selection } from '../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ThunkActionType } from '../index';
import { asyncGetTaxonomy } from './taxonomyThunk';

type State = {
  selection: Selection[];
  category: Category[];
  genre: Genre[];
  feeling: Feeling[];
};

const initialState: State = {
  selection: [],
  category: [],
  genre: [],
  feeling: [],
};

const taxonomy = createSlice({
  name: 'taxonomy',
  initialState,
  reducers: {
    setSelection: (state, action: PayloadAction<Selection[]>) => {
      state.selection = action.payload;
    },
    setCategory: (state, action: PayloadAction<Category[]>) => {
      state.category = action.payload;
    },
    setGenre: (state, action: PayloadAction<Genre[]>) => {
      state.genre = action.payload;
    },
    setFeeling: (state, action: PayloadAction<Feeling[]>) => {
      state.feeling = action.payload;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return { ...state, ...action.payload.taxonomy };
    },
  },
});

export const { setSelection, setCategory, setGenre, setFeeling } = taxonomy.actions;
export default taxonomy.reducer;

export const getTaxonomiesClientSide = (): ThunkActionType => async (dispatch) => {
  try {
    await asyncGetTaxonomy(dispatch);
  } catch (e) {
    console.log('getTaxonomiesClientSide', e);
  }
};
