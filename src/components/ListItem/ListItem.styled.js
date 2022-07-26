import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';

export const StyledCard = styled(Card)(() => ({
  overflow: 'unset',
  boxShadow: '0 0 10px -3px rgba(0,0,0,0.4);'
}));

export const IconText = styled('span')(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '5px'
}));

export const CuisineBox = styled('div')(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '5px',
  margin: '10px 0'
}));

export const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));