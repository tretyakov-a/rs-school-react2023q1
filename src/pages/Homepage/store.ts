import { createAsyncThunk, createSlice } from '@src/store/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FlickrService, Photo } from '@src/api/images';
import { Loading, LoadingState } from '@common/types/loading';
import { AsyncThunkConfig } from '@src/store';

export interface ImagesListState extends LoadingState {
  currentSearchValue: string;
  data: Photo[];
}

const isPreloadedState = !import.meta.env.SSR && window.__PRELOADED_STATE__ !== undefined;

const initialState: ImagesListState = isPreloadedState
  ? window.__PRELOADED_STATE__.imagesList
  : {
      currentSearchValue: '',
      data: [],
      error: null,
      loading: Loading.IDLE,
    };

const imageService = new FlickrService();

export const findImages = createAsyncThunk<Photo[], string, AsyncThunkConfig>(
  'imagesList/findImages',
  async (text: string, { dispatch }) => {
    const response = await imageService.findImages({ text });
    dispatch(imagesListSlice.actions.setCurrentSearchValue(text));
    return response.photo;
  },
  {
    condition: (text: string, { getState }) => {
      const { loading, currentSearchValue } = getState().imagesList;
      if (text === currentSearchValue || loading === Loading.PENDING) {
        return false;
      }
    },
  }
);

export const imagesListSlice = createSlice({
  name: 'imagesList',
  initialState,
  reducers: {
    setCurrentSearchValue: (state, action: PayloadAction<string>) => {
      state.currentSearchValue = action.payload;
    },
    setImages: (state, action: PayloadAction<Photo[]>) => {
      state.data = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(findImages.pending, (state) => {
      state.loading = Loading.PENDING;
    });
    builder.addCase(findImages.fulfilled, (state, action) => {
      state.loading = Loading.SUCCESS;
      state.data = action.payload;
    });
    builder.addCase(findImages.rejected, (state, action) => {
      state.loading = Loading.ERROR;
      state.error = action.error.message || '';
    });
  },
});

export const { setImages, setCurrentSearchValue } = imagesListSlice.actions;

export default imagesListSlice.reducer;
