import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setCoordinates, setGeoCoords } from '../../redux/slices/coordinatesSlice';
import PropTypes from 'prop-types';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { Button, Chip, Rating } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import defaultImage from '../../access/images/default-restaurant.webp';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import LanguageIcon from '@mui/icons-material/Language';
import {
  StyledCard,
  ExpandMore,
  IconText,
  CuisineBox
} from './ListItem.styled';

const ListItem = ({ place, isSmaller = false, color }) => {
  const dispatch = useDispatch();
  const MAX_DESCRIPTION_LENGTH = 180;

  const {
    photo,
    name = 'No Name',
    description = 'No description',
    phone,
    website,
    email,
    address,
    rating = 0,
    cuisine = [],
    latitude,
    longitude
  } = place;

  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard>
      <CardHeader
        avatar={
          !isSmaller && (
            <Avatar sx={{ bgcolor: color }} aria-label="recipe">
              {(name || 'No Name').substring(0, 1).toUpperCase()}
            </Avatar>
          )
        }
        action={
          <Rating size={isSmaller ? 'small' : ''} value={Number(rating)} style={{ pointerEvents: 'none', marginTop: '10px' }} />
        }
        title={(name || 'No Name')}
        subheader={address}
      />
      <CardMedia
        component="img"
        height="194"
        image={photo?.images?.large?.url || defaultImage}
        title={name}
        alt={name}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description.length > MAX_DESCRIPTION_LENGTH ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...` : description || 'No description'}
        </Typography>
        {!isSmaller && (
          <Button
            onClick={() => {
              dispatch(setCoordinates({ lat: Number(latitude), lng: Number(longitude) }))
              dispatch(setGeoCoords({ lat: Number(latitude), lng: Number(longitude) }))
            }}
            style={{ marginTop: '10px' }}
            size={'small'}
            variant="outlined"
          >
            Show on the map
          </Button>
        )}
      </CardContent>

      {!isSmaller && (
        <>
          <CardActions
            onClick={handleExpandClick}
            style={{ borderTop: '1px solid rgba(0,0,0,0.2)', cursor: 'pointer' }} disableSpacing>
            <Typography variant="p">
              Show more
            </Typography>
            <ExpandMore
              expand={expanded}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMoreIcon />
            </ExpandMore>
          </CardActions>

          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph>
                {address ? <IconText><LocationOnIcon />{address}</IconText> : null}
              </Typography>
              <Typography paragraph>
                {phone ? <IconText><LocalPhoneIcon /><a href={`tel:${phone}`}>{phone}</a></IconText> : null}
              </Typography>
              <Typography paragraph>
                {email ? <IconText><EmailIcon /><a href={`mailto:${email}`}>{email}</a></IconText> : null}
              </Typography>
              <Typography paragraph>
                {website ? <IconText><LanguageIcon /><a target='_blank' href={website}>Website</a></IconText> : null}
              </Typography>
              <CuisineBox>
                {cuisine.map(({ name, key }) => (<Chip key={key} label={name} size="small" />))}
              </CuisineBox>
              <Typography paragraph>
                {description}
              </Typography>
            </CardContent>
          </Collapse>
        </>
      )}
    </StyledCard>
  );
}

ListItem.propTypes = {
  place: PropTypes.object.isRequired,
  isSmaller: PropTypes.bool,
  color: PropTypes.string
}

export default ListItem;