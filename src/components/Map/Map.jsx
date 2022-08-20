import { Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import uuid from 'react-uuid'
import ListItem from '../ListItem';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setCoordinates, setGeoCoords } from '../../store/slices/coordinatesSlice';
import { fetchPlaces } from '../../store/slices/placesSlice';
import { getFilteredArrayByRating } from '../../helpers';
import { CustomMapContainer } from './Map.styled';

const Map = (props = {}) => {
  const dispatch = useDispatch();
  const { children } = props;
  const { coordinates, bounds } = useSelector(state => state.coordinates.value);
  const { entities } = useSelector(state => state.places);
  const filterData = useSelector((state) => state.filter.value);

  const places = getFilteredArrayByRating(entities, filterData.rating);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({ coords: { latitude, longitude } }) => {
      dispatch(setCoordinates({ lat: latitude, lng: longitude }))
      dispatch(setGeoCoords({ lat: latitude, lng: longitude }))
    });
  }, []);

  useEffect(() => {
    dispatch(fetchPlaces(bounds));
  }, [bounds, coordinates]);

  const icon = Leaflet.icon({
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [13, 0]
  });

  const mapData = {
    center: [coordinates.lat, coordinates.lng],
    margin: [50, 50, 50, 50],
    zoom: 18,
    icon
  };

  return (
    <CustomMapContainer
      center={mapData.center}
      zoom={mapData.zoom}
    >
      {children}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place) => {
        if (place.latitude && place.longitude) {
          const marker = <Marker
            key={uuid()}
            icon={mapData.icon}
            position={[Number(place.latitude), Number(place.longitude)]}>
            <Popup>
              <ListItem place={place} isSmaller />
            </Popup>
          </Marker>;

          return marker;
        }
      })}
    </CustomMapContainer>
  )
}

export default Map;
