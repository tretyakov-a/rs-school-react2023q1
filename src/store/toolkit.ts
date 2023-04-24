import * as toolkitRaw from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const { configureStore, createAsyncThunk, createSlice } = ((toolkitRaw as any).default ??
  toolkitRaw) as typeof toolkitRaw;
