import { createSlice } from '@reduxjs/toolkit';
import { RATINGS, TYPES } from '../../types';

const initialState = {
  value: {
    rating: RATINGS.all,
    type: TYPES.restaurants,
  }
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    changeRating: (state, action) => {
      state.value.rating = action.payload;
    },
    changeType: (state, action) => {
      state.value.type = action.payload;
    }
  }
})

const {
  changeRating,
  changeType
} = filterSlice.actions;

export {
  filterSlice,
  changeRating,
  changeType
};