import { useEffect, useState } from 'react';
import { CssBaseline } from '@mui/material';
import Header from '../Header';
import List from '../List';
import Map from '../Map';
import { GridContainer, GridItem } from './App.styled';
import MapControl from '../Map/MapControl';
import { getPlacesData, getDefaultPlacesData } from '../../api';

import '../../access/styles/global.css';
import ListItem from '../ListItem';

const App = () => {
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [bounds, setBounds] = useState(null);
  const [geoCoords, setGeoCoords] = useState(null);
  const [coordinates, setCoordinates] = useState(  { lat: 49.8374288838513, lng: 24.0257717576607 });
  const [selectedPopup, setSelectedPopup] = useState('');
  const [type, setType] = useState('restaurants');
  const [rating, setRating] = useState('');
  const [isLimitError, setIsLimitError] = useState(false);

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
    if (isLimitError) return;

    getPlacesData({
      type,
      rating,
      sw: bounds?.sw,
      ne: bounds?.ne
    }).then((data) => {
      // is limit error ! need fix
      if (!data.length) {
        setIsLimitError(true);

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
  }, [type, bounds, coordinates]);

  useEffect(() => {
    let list = [];

    if (rating) {
      list = places.filter(r => Number(r.rating) >= Number(rating));
    }

    setFilteredPlaces(list);
    }, [rating])

  const renderPlacesData = filteredPlaces.length ? filteredPlaces : places;

  return (
    <>
      <CssBaseline />

      <Header
        setCoordinates={setCoordinates}
      />

      <GridContainer container spacing={3}>
        <GridItem item xs={12} md={4}>
          <List
            selectedPopup={selectedPopup}
            places={renderPlacesData}
            type={type}
            setType={setType}
            rating={rating}
            setRating={setRating}
          />
        </GridItem>
        <GridItem item xs={12} md={8}>
          <Map
            places={renderPlacesData}
            coordinates={coordinates}
          >
            <MapControl
              setCoordinates={setCoordinates}
              setBounds={setBounds}
              geoCoords={geoCoords}
              setSelectedPopup={(id) => setSelectedPopup(id)}
            />
          </Map>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default App;