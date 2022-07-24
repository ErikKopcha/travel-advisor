import { MapContainer, TileLayer, useMapEvents } from 'react-leaflet';
import Leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import PropTypes from 'prop-types';

const Map = (props = {}) => {
  const { coordinates, children } = props;

  // const isMobile = useMediaQuery('(min-width: 600px');

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
      {/*<Marker*/}
      {/*  icon={defaultProps.icon}*/}
      {/*  position={[defaultProps.center.lat, defaultProps.center.lng]}>*/}
      {/*  <Popup>*/}
      {/*    A pretty CSS3 popup. <br /> Easily customizable.*/}
      {/*  </Popup>*/}
      {/*</Marker>*/}
    </MapContainer>
  )
}

Map.propTypes = {
  coordinates: PropTypes.object.isRequired
}

export default Map;
