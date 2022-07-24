import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AppThunk } from '../store';
import {
  fetchMapItems,
  fetchMedialibrary,
  removeFileMedialibrary,
  uploadFileMapItems,
  uploadFileMedialibrary,
} from '../../api/requests';
import { MapFile, MediaFile } from '../../typings/types';
import { MapContent } from '../../components/AddMapModal/AppMapModal';

type State = {
  loading: boolean;
  files: MediaFile[] | null;
  maps: MapFile[] | null;
};

const initialState: State = {
  loading: false,
  files: null,
  maps: null,
};

const medialibrary = createSlice({
  initialState,
  name: 'medialibrary',
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setFileList: (state, action: PayloadAction<MediaFile[]>) => {
      state.files = action.payload;
    },
    setMapList: (state, action) => {
      state.maps = action.payload;
    },
  },
});

export const { setLoading, setFileList, setMapList } = medialibrary.actions;

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

export const getMapList = (): AppThunk => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    const { data } = await fetchMapItems();

    dispatch(setMapList(data));
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

export const uploadFileMap =
  (files: { map: MapContent; minimap: MapContent }): AppThunk =>
  async (dispatch) => {
    dispatch(setLoading(true));
    const { map, minimap } = files;
    if (!map || !minimap) {
      return;
    }

    try {
      const formData = new FormData();
      Array.from(map).forEach((file) => formData.append('map', file));
      Array.from(minimap).forEach((file) => formData.append('minimap', file));
      const { data } = await uploadFileMapItems(formData);

      if (data) {
        dispatch(getMapList());
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
