import { useEffect, useState } from 'react';
import Skeleton from '../Skeleton';
import ListItem from '../ListItem/ListItem';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ListWrap, FormControlWrap } from './List.styled';

const List = () => {
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState('');
  const [rating, setRating] = useState('');

  const skeletons = [1, 2, 3, 4].map((e, i) => <Skeleton key={e + i} />);
  const list = [1, 2, 3, 4, 5].map((item, index) => <ListItem key={index} />);

  const content = loading ? skeletons : list;

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 2000)
  }, [])

  return (
      <ListWrap>
        <Typography variant="h5">Restaurants, Hotels & Attractions around you</Typography>

        <FormControlWrap>
          <FormControl sx={{ m: 0, minWidth: 120, width: '100%' }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              value={type}
              onChange={({ target }) => setType(target.value)}
              labelId="type"
              id="type"
              label="Type"
            >
              <MenuItem value=""><em>All</em></MenuItem>
              <MenuItem value="restaurants">Restaurants</MenuItem>
              <MenuItem value="hotels">Hotels</MenuItem>
              <MenuItem value="attractions">Attractions</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ m: 0, minWidth: 120, width: '100%' }}>
            <InputLabel id="type-rating">Rating</InputLabel>
            <Select
              value={rating}
              onChange={({ target }) => setRating(target.value)}
              labelId="rating"
              id="rating"
              label="rating"
            >
              <MenuItem value=""><em>All</em></MenuItem>
              <MenuItem value={3}>Above 3.0</MenuItem>
              <MenuItem value={4}>Above 4.0</MenuItem>
              <MenuItem value={4.5}>Above 4.5</MenuItem>
            </Select>
          </FormControl>
        </FormControlWrap>

        {content}
      </ListWrap>
  )
}

export default List;