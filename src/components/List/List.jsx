import { createRef, useEffect, useRef, useState } from 'react';
import Skeleton from '../Skeleton';
import ListItem from '../ListItem/ListItem';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ListWrap, FormControlWrap } from './List.styled';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { changeRating, changeType } from '../../redux/slices/filterSlice';
import { RATINGS, TYPES } from '../../types';

const List = (props = {}) => {
  const filterData = useSelector((state) => state.filter.value);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => { setLoading(false) }, 2000)
  }, [])

  const {
    places = [],
  } = props;

  const skeletons = [1, 2, 3, 4].map((e, i) => <Skeleton key={e + i} />);
  const list = places.map((item, index) => {
    return <ListItem place={item} key={index} />
  } );

  const content = loading ? skeletons : list;

  return (
      <ListWrap>
        <Typography variant="h5">Restaurants, Hotels & Attractions around you</Typography>

        <FormControlWrap>
          <FormControl sx={{ m: 0, minWidth: 120, width: '100%' }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              value={filterData.type}
              onChange={({ target }) => dispatch(changeType(TYPES[target.value]))}
              labelId="type"
              id="type"
              label="Type"
            >
              {Object.values(TYPES).map((t) => {
                return (
                  <MenuItem key={TYPES[t]} value={TYPES[t]}>
                    {TYPES[t].substring(0,1).toUpperCase()}{TYPES[t].substring(1, TYPES[t].length)}
                  </MenuItem>
                )
              })}
            </Select>
          </FormControl>

          <FormControl sx={{ m: 0, minWidth: 120, width: '100%' }}>
            <InputLabel id="type-rating">Rating</InputLabel>
            <Select
              value={filterData.rating}
              onChange={({ target }) => dispatch(changeRating(target.value))}
              labelId="rating"
              id="rating"
              label="rating"
            >
              <MenuItem key="all" value="">All</MenuItem>
              {Object.keys(RATINGS).map((t) => {
                if (RATINGS[t]) {
                  return (
                    <MenuItem key={t} value={t}>{RATINGS[t]}</MenuItem>
                  )
                }
              })}
            </Select>
          </FormControl>
        </FormControlWrap>

        {content}
      </ListWrap>
  )
}

List.propTypes = {
  places: PropTypes.array.isRequired
}

export default List;