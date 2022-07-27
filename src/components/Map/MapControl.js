import { useMapEvents } from 'react-leaflet';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCoordinates, setBounds, setSelectedPopup } from '../../redux/slices/coordinatesSlice';

const MapControl = () => {
  const dispatch = useDispatch();
  const geoCoords = useSelector(state => state.coordinates.value.geoCoords);

  const map = useMapEvents({
    moveend: () => {
      const bounds = map.getBounds();

      dispatch(setCoordinates({
        lat: map.getCenter().lat,
        lng: map.getCenter().lng
      }));

      dispatch(setBounds({
        ne: {
          lat: bounds.getNorthEast().lat,
          lng: bounds.getNorthEast().lng
        },
        sw: {
          lat: bounds.getSouthWest().lat,
          lng: bounds.getSouthWest().lng
        }
      }));
    },
    popupopen: (e) => {
      try {
        const id = e.popup.options.children.props.place.address + '-' + e.popup.options.children.props.place.location_id;
        dispatch(setSelectedPopup(id))
      } catch (e) {
        console.warn(e);
      }
    }
  });

  useEffect(() => {
    if (geoCoords) {
      map.setView(geoCoords)
    }
  }, [geoCoords]);

  return null
}

export default MapControl;