import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ApplicationStatuses } from '../../typings/enum';

interface State {
  status: ApplicationStatuses;
}

const initialState: State = {
  status: ApplicationStatuses.initial,
};

const options = createSlice({
  initialState,
  name: 'options',
  reducers: {
    setApplicationStatus: (state, action: PayloadAction<ApplicationStatuses>) => {
      state.status = action.payload;
    },
  },
});

const optionsReducer = options.reducer;

export default optionsReducer;

export const { setApplicationStatus } = options.actions;
