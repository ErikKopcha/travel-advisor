import { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import Header from '../Header';
import List from '../List';
import Map from '../Map';
import { GridContainer, GridItem } from './App.styled';
import MapControl from '../Map/MapControl';
import { getPlacesData, getDefaultPlacesData } from '../../api';
import { useDispatch } from 'react-redux';

import '../../access/styles/global.css';
import { setCoordinates, setGeoCoords } from '../../redux/slices/coordinatesSlice';

const App = () => {
  const dispatch = useDispatch();

  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setCoordinates({ lat: latitude, lng: longitude }))
      dispatch(setGeoCoords({ lat: latitude, lng: longitude }))
    });

    getDefaultPlacesData().then(
      result => {
        setPlaces(result);
      },
      error => {
        setPlaces([]);
        console.warn(error);
      }
    ).catch((error) => {
      setPlaces([]);
      console.warn(error);
    });
  }, []);

  // useEffect(() => {
  //   if (isLimitError) return;
  //
  //   getPlacesData({
  //     sw: bounds?.sw,
  //     ne: bounds?.ne
  //   }).then((data) => {
  //     // is limit error ! need fix
  //     if (!data.length) {
  //       setIsLimitError(true);
  //
  //       getDefaultPlacesData().then(
  //         result => {
  //           setPlaces(result);
  //         },
  //         error => {
  //           setPlaces([]);
  //           console.warn(error);
  //         }
  //       ).catch((error) => {
  //         setPlaces([]);
  //         console.warn(error);
  //       });
  //     } else {
  //       setPlaces(data);
  //     }
  //
  //   }).catch((error) => {
  //     console.error(error);
  //   })
  // }, [bounds, coordinates]);

  // useEffect(() => {
  //   let list = [];
  //
  //   if (rating) {
  //     list = places.filter(r => Number(r.rating) >= Number(rating));
  //   }
  //
  //   setFilteredPlaces(list);
  //   }, [rating])

  const renderPlacesData = filteredPlaces.length ? filteredPlaces : places;

  return (
    <>
      <CssBaseline />

      <Header
        setCoordinates={setCoordinates}
      />

      <GridContainer container spacing={3}>
        <GridItem item xs={12} md={4}>
          <List places={renderPlacesData} />
        </GridItem>
        <GridItem item xs={12} md={8}>
          <Map places={renderPlacesData}>
            <MapControl />
          </Map>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default App;