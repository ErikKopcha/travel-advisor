import Skeleton from '../Skeleton';
import ListItem from '../ListItem/ListItem';
import { Alert, AlertTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Typography from '@mui/material/Typography';
import { ListWrap, FormControlWrap } from './List.styled';
import { useDispatch, useSelector } from 'react-redux';
import { changeRating, changeType } from '../../store/slices/filterSlice';
import { LOADING_TYPES, RATINGS, TYPES } from '../../types';
import { getFilteredArrayByRating, getRandomRangeNum } from '../../helpers';
import { amber, blue, common, green, indigo, lime, orange, pink, purple, red, teal } from '@mui/material/colors';

const List = () => {
  const dispatch = useDispatch();
  const filterData = useSelector((state) => state.filter.value);
  const { entities, loading, isDefaultData } = useSelector(state => state.places);

  const COLORS = [red, blue, orange, purple, green, amber, common, indigo, lime, pink, teal];
  const places = getFilteredArrayByRating(entities, filterData.rating);

  const skeletons = [1, 2, 3, 4].map((e, i) => <Skeleton key={e + i} />);
  const list = places.map((item, index) => {
    return <ListItem place={item} color={COLORS[getRandomRangeNum(0, COLORS.length)][500]} key={index} />
  });
  const content = loading === LOADING_TYPES.pending ? skeletons : list;

  return (
      <ListWrap>
        <Typography variant="h5">Restaurants, Hotels & Attractions around you</Typography>

        {isDefaultData && (
          <Alert className="alert" style={{ position: 'sticky', top: '0', zIndex: 999 }} variant="filled" severity="error">
            <AlertTitle><strong>WARNING!</strong></AlertTitle>
            <strong>
              The limit for receiving data from the server has been reached. <br/>
              Type selection is blocked.
              Saved data is loaded.
            </strong>
          </Alert>
        )}

        <FormControlWrap>
          <FormControl sx={{ m: 0, minWidth: 120, width: '100%' }}>
            <InputLabel id="type-label">Type</InputLabel>
            <Select
              disabled={isDefaultData}
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

export default List;