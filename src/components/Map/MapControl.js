import { useMapEvents } from 'react-leaflet';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const MapControl = (props = {}) => {
  const {
    setCoordinates,
    setBounds,
    geoCoords
  } = props;

  const map = useMapEvents({
    move: () => {
      setCoordinates({
        lat: map.getCenter().lat,
        lng: map.getCenter().lng
      });

      const bounds = map.getBounds();
      setBounds({
        ne: bounds.getNorthEast(),
        sw: bounds.getSouthWest()
      })
    }
  });

  useEffect(() => {
    if (geoCoords) {
      map.setView(geoCoords)
    }
  }, [geoCoords]);

  return null
}

MapControl.propTypes = {
  setCoordinates: PropTypes.func.isRequired,
  setBounds: PropTypes.func.isRequired,
  geoCoords: PropTypes.object
}

export default MapControl;