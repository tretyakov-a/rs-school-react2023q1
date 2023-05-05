import * as toolkitRaw from '@reduxjs/toolkit';

type ToolkitRaw = typeof toolkitRaw & { default?: unknown };

export const { configureStore, createAsyncThunk, createSlice } = ((toolkitRaw as ToolkitRaw)
  .default ?? toolkitRaw) as typeof toolkitRaw;
