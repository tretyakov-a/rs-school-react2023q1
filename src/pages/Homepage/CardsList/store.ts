import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { FlickrService, PhotoInfo } from '@src/api/images';
import { Loading, LoadingState } from '@common/types/loading';
import { AsyncThunkConfig } from '@src/store';
import { loadImage } from '@common/helpers';

interface CardsListState extends LoadingState {
  currentId: string;
}

const initialState: CardsListState = {
  currentId: '',
  error: null,
  loading: Loading.IDLE,
};

const imageService = new FlickrService();

export const getImageInfo = createAsyncThunk<
  PhotoInfo & { imageRatio: number },
  string,
  AsyncThunkConfig
>(
  'cardsList/getImageInfo',
  async (id: string) => {
    const data = await imageService.getImageInfo(id);
    const { width, height } = await loadImage(data.imageUrl);
    return { ...data, imageRatio: height / width };
  },
  {
    condition: (id: string, { getState }) => {
      const { loading, currentId } = getState().cardsList;
      if (currentId === id || loading === Loading.PENDING) {
        return false;
      }
    },
  }
);

export const cardsListSlice = createSlice({
  name: 'infoModal',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getImageInfo.pending, (state) => {
      state.loading = Loading.PENDING;
    });
    builder.addCase(getImageInfo.fulfilled, (state) => {
      state.loading = Loading.SUCCESS;
    });
    builder.addCase(getImageInfo.rejected, (state, action) => {
      state.loading = Loading.ERROR;
      state.error = action.error.message || '';
    });
  },
});

export default cardsListSlice.reducer;
