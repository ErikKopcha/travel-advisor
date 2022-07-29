import { styled } from '@mui/material/styles';
import { MapContainer } from 'react-leaflet';

export const CustomMapContainer = styled(MapContainer)(() => ({
  maxHeight: 'calc(100vh - 64px)',
  overflow: 'hidden',
  height: 'calc(100vh - 64px)',
  position: 'relative'
}));
