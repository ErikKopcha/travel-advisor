import { CssBaseline } from '@mui/material';
import Header from '../Header';
import List from '../List';
import Map from '../Map';
import { GridContainer, GridItem } from './App.styled';
import MapControl from '../Map/MapControl';

import '../../access/styles/global.css';

const App = () => {
  return (
    <>
      <CssBaseline />

      <Header />

      <GridContainer container spacing={3} className="root-container">
        <GridItem item xs={12} md={4}>
          <List />
        </GridItem>
        <GridItem item xs={12} md={8}>
          <Map>
            <MapControl />
          </Map>
        </GridItem>
      </GridContainer>
    </>
  )
}

export default App;