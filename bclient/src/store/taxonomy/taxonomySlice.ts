import { CategoryTax, FeelingTax, GenreTax, SelectionTax } from '../../types/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { ThunkActionType } from '../index';
import { asyncGetTaxonomy } from './taxonomyThunk';

type State = {
  selection: SelectionTax[];
  category: CategoryTax[];
  genre: GenreTax[];
  feeling: FeelingTax[];
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
    setSelection: (state, action: PayloadAction<SelectionTax[]>) => {
      state.selection = action.payload;
    },
    setCategory: (state, action: PayloadAction<CategoryTax[]>) => {
      state.category = action.payload;
    },
    setGenre: (state, action: PayloadAction<GenreTax[]>) => {
      state.genre = action.payload;
    },
    setFeeling: (state, action: PayloadAction<FeelingTax[]>) => {
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
