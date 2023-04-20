import { configureStore } from '@reduxjs/toolkit';
import searchReducer from '@pages/Homepage/SearchBar/store';
import registrationListReducer from '@pages/Registration/store';
import imagesListReducer from '@pages/Homepage/store';
import cardsListReducer from '@pages/Homepage/CardsList/store';

export const store = configureStore({
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['registrationList/addListItem', 'registrationList/setListData'],
        ignoredPaths: ['registrationList.data'],
      },
    }),
  reducer: {
    search: searchReducer,
    registrationList: registrationListReducer,
    imagesList: imagesListReducer,
    cardsList: cardsListReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export interface AsyncThunkConfig {
  dispatch: AppDispatch;
  state: RootState;
}

declare global {
  interface Window {
    __PRELOADED_STATE__: RootState;
  }
}
