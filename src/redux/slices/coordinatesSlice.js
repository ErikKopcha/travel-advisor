import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    bounds: null,
    geoCoords: null,
    coordinates: { lat: 49.8374288838513, lng: 24.0257717576607 },
    selectedPopup: ''
  }
};

// default data for lock map and use data from JSON file
// bl_latitude: 49.83527682324984
// tr_latitude: 49.839580848677755
// bl_longitude: 24.021804770527673
// tr_longitude: 24.029738744793725
// lat: 49.8374288838513
// lng: 24.0257717576607

const coordinatesSlice = createSlice({
  name: 'coordinates',
  initialState,
  reducers: {
    setBounds: (state, action) => {
      state.value.bounds = action.payload;
    },
    setGeoCoords: (state, action) => {
      state.value.geoCoords = action.payload;
    },
    setCoordinates: (state, action) => {
      state.value.coordinates = action.payload;
    },
    setSelectedPopup: (state, action) => {
      state.value.selectedPopup = action.payload;
    },
  }
})

const {
  setBounds,
  setCoordinates,
  setGeoCoords,
  setSelectedPopup
} = coordinatesSlice.actions;

export {
  coordinatesSlice,
  setBounds,
  setCoordinates,
  setGeoCoords,
  setSelectedPopup
}