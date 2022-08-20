import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getDefaultPlacesData, getPlacesData } from '../../api';
import { LOADING_TYPES } from '../../types';

const fetchPlaces = createAsyncThunk(
  'places/fetchStatus',
  async (props = {}) => {
    try {
      let data = await getPlacesData(props);

      if (Array.isArray(data) && data.length) return [false, data];

      data = await getDefaultPlacesData();
      // [isDefaultData: boolean, data]
      return [true, data];
    } catch (e) {
      return [];
    }
  }
)

const initialState = {
  entities: [],
  loading: LOADING_TYPES.idle,
  isDefaultData: false
};

const placesSlice = createSlice({
  name: 'places',
  initialState,
  reducers: { },
  extraReducers: (builder) => {
    builder.addCase(fetchPlaces.fulfilled, (state, action) => {
      const [isDefaultData, data] = action.payload;

      state.entities = data;
      state.isDefaultData = isDefaultData;
    })
  },
});

const { reducer } = placesSlice;

export {
  reducer,
  fetchPlaces
};