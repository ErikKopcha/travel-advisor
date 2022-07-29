import { configureStore } from '@reduxjs/toolkit';
import { coordinatesSlice } from './slices/coordinatesSlice';
import { filterSlice } from './slices/filterSlice';
import { reducer as placesReducer } from './slices/placesSlice';

export const store = configureStore({
  reducer: {
    filter: filterSlice.reducer,
    coordinates: coordinatesSlice.reducer,
    places: placesReducer
  }
});
