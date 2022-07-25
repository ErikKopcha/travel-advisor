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

  // default data for lock map and use data from JSON file
  // bl_latitude: 49.83527682324984
  // tr_latitude: 49.839580848677755
  // bl_longitude: 24.021804770527673
  // tr_longitude: 24.029738744793725
  // lat: 49.8374288838513
  // lng: 24.0257717576607

  return null
}

MapControl.propTypes = {
  setCoordinates: PropTypes.func.isRequired,
  setBounds: PropTypes.func.isRequired,
  geoCoords: PropTypes.object
}

export default MapControl;