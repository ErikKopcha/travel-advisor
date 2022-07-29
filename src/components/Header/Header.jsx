import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import AirplaneTicketIcon from '@mui/icons-material/AirplaneTicket';
import { TypographyCentered } from './Header.styled';

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <TypographyCentered
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'flex' } }}
          >
            <AirplaneTicketIcon style={{ marginRight: '5px' }} />
            Travel Advisor
          </TypographyCentered>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;