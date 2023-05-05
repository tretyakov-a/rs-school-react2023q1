import { createSlice } from '@src/store/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { FormInputs } from './RegistrationForm/types';

export type StoredFormInputs = Omit<FormInputs, 'avatar'> & {
  avatar: File | string;
};

export interface RegistrationListState {
  data: StoredFormInputs[];
}

const initialState: RegistrationListState = {
  data: [],
};

export const registrationListSlice = createSlice({
  name: 'registrationList',
  initialState,
  reducers: {
    addListItem: (state, action: PayloadAction<StoredFormInputs>) => {
      state.data = [...state.data, action.payload];
    },
    setListItems: (state, action: PayloadAction<StoredFormInputs[]>) => {
      state.data = [...action.payload];
    },
  },
});

export const { setListItems, addListItem } = registrationListSlice.actions;

export default registrationListSlice.reducer;
