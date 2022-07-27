import { configureStore } from '@reduxjs/toolkit';
import { coordinatesSlice } from './slices/coordinatesSlice';
import { filterSlice } from './slices/filterSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    coordinates: coordinatesSlice.reducer
  }
});
