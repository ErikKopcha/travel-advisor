import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from 'prop-types';
import uuid from 'react-uuid'
import ListItem from '../ListItem';
import { useSelector } from 'react-redux';

const Map = (props = {}) => {
  const coordinates = useSelector(state => state.coordinates.value.coordinates);
  const { children, places = [] } = props;

  const icon = Leaflet.icon({
    iconUrl: "https://unpkg.com/leaflet@1.4.0/dist/images/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [13, 0]
  });

  const defaultProps = {
    center: coordinates,
    margin: [50, 50, 50, 50],
    zoom: 18,
    icon
  };

  return (
    <MapContainer
      style={{ maxHeight: 'calc(100vh - 64px)', overflow: 'hidden', height: 'calc(100vh - 64px)' }}
      center={[defaultProps.center.lat, defaultProps.center.lng]}
      zoom={defaultProps.zoom}
    >
      {children}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map((place) => {
        if (place.latitude && place.longitude) {
          return (
            <Marker
              key={uuid()}
              icon={defaultProps.icon}
              position={[Number(place.latitude), Number(place.longitude)]}>
              <Popup>
                <ListItem place={place} isSmaller />
              </Popup>
            </Marker>
          )
        }
      })}
    </MapContainer>
  )
}

export default Map;
