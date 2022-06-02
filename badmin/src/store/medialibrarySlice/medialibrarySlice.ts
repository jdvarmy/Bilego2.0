import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import { fetchMedialibrary, removeFileMedialibrary, uploadFileMedialibrary } from '../../api/requests';
import { MediaFile } from '../../typings/types';

type State = {
  loading: boolean;
  files: MediaFile[] | null;
};

const initialState: State = {
  loading: false,
  files: null,
};

const medialibrary = createSlice({
  initialState,
  name: 'medialibrary',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFileList: (state, action) => {
      state.files = action.payload;
    },
  },
});

export const { setLoading, setFileList } = medialibrary.actions;

export default medialibrary.reducer;

export const getFileList = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await fetchMedialibrary();

    dispatch(setFileList(data));
  } catch (e) {
    console.log(e);
  } finally {
    dispatch(setLoading(false));
  }
};

export const uploadFile =
  (files: FileList): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const formData = new FormData();
      Array.from(files).forEach((file) => {
        formData.append('images[]', file);
      });
      const { data } = await uploadFileMedialibrary(formData);

      if (data) {
        dispatch(getFileList());
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };

export const removeFile =
  (id: number): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const { data } = await removeFileMedialibrary(id);

      if (data) {
        dispatch(getFileList());
      }
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(setLoading(false));
    }
  };
