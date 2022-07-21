import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

export const GridContainer = styled(Grid)(() => ({
    width: '100%',
    margin: '0',
    maxHeight: 'calc(100vh - 64px)',
    height: 'calc(100vh - 64px)',
    overflow: 'hidden'
}));

export const GridItem = styled(Grid)(() => ({
  padding: `0 !important`
}));