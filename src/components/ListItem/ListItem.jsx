import { useState } from 'react';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import { Rating } from '@mui/material';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActions from '@mui/material/CardActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Collapse from '@mui/material/Collapse';
import { StyledCard, ExpandMore } from './ListItem.styled';

const ListItem = (props) => {
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            R
          </Avatar>
        }
        action={
          <Rating value={4} style={{ pointerEvents: 'none' }} />
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      />
      <CardMedia
        component="img"
        height="194"
        image="data:image/jpeg;base64,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"
        alt="Paella dish"
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          This impressive paella is a perfect party dish and a fun meal to cook
          together with your guests. Add 1 cup of frozen peas along with the mussels,
          if you like.
        </Typography>
      </CardContent>
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
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don&apos;t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent>
      </Collapse>
    </StyledCard>
  );
}

ListItem.propTypes = {

};

export default ListItem;