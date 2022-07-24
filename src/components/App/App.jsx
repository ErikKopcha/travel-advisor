import { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import Header from '../Header';
import List from '../List';
import Map from '../Map';
import { GridContainer, GridItem } from './App.styled';
import MapControl from '../Map/MapControl';
import { getPlacesData } from '../../api';

const App = () => {
  const [places, setPlaces] = useState();
  const [bounds, setBounds] = useState(null);
  const [geoCoords, setGeoCoords] = useState(null);
  const [coordinates, setCoordinates] = useState(  { lat: 49.8396258244128, lng: 24.017416818856262 });

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      setCoordinates({
        lat: latitude,
        lng: longitude
      });

      setGeoCoords({
        lat: latitude,
        lng: longitude
      });
    });
  }, []);

  useEffect(() => {
    getPlacesData({
      sw: bounds?.sw,
      ne: bounds?.ne
    }).then((data) => {
      setPlaces(data);
    }).catch((error) => {
      console.error(error);
    })
  }, [bounds, coordinates]);

  return (
    <>
      <CssBaseline />

      <Header />

      <GridContainer container spacing={3}>
        <GridItem item xs={12} md={4}>
          <List places={places} />
        </GridItem>
        <GridItem item xs={12} md={8}>
          <Map coordinates={coordinates}>
            <MapControl
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              geoCoords={geoCoords}
            />
          </Map>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default App;