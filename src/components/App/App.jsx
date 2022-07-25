import { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import Header from '../Header';
import List from '../List';
import Map from '../Map';
import { GridContainer, GridItem } from './App.styled';
import MapControl from '../Map/MapControl';
import { getPlacesData, getDefaultPlacesData } from '../../api';

import '../../access/styles/global.css';

const App = () => {
  const [places, setPlaces] = useState();
  const [bounds, setBounds] = useState(null);
  const [geoCoords, setGeoCoords] = useState(null);
  const [coordinates, setCoordinates] = useState(  { lat: 49.8374288838513, lng: 24.0257717576607 });

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
      if (!data.length) {
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
      } else {
        setPlaces(data);
      }

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