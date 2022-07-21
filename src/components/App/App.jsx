import { CssBaseline } from '@mui/material';
import Header from '../Header';
import List from '../List';
import Map from '../Map';
import { GridContainer, GridItem } from './App.styled';

const App = () => {
  return (
    <>
      <CssBaseline />

      <Header />

      <GridContainer container spacing={3}>
        <GridItem item xs={12} md={4}>
          <List />
        </GridItem>
        <GridItem item xs={12} md={8}>
          <Map />
        </GridItem>
      </GridContainer>
    </>
  )
}

export default App;