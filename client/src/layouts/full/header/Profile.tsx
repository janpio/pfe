import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useStore } from '../../../state/store';
import {
  Avatar,
  Box,
  Menu,
  Button,
  IconButton,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { IconUser, IconLayoutDashboard } from '@tabler/icons';
import ProfileImg from '/src/assets/images/profile/user-1.jpg';

const Profile = () => {

  const user = useStore((state: any) => state.user)
  const logout = useStore((state: any) => state.logout)

  const navigate = useNavigate()

  const handleLogout = () => {
    logout();
    navigate('/auth/login');
  }

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Box>
        <IconButton
          size="large"
          aria-label="show profile & logout"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <Avatar
            src={user?.image || ProfileImg}
            alt={ProfileImg}
            sx={{
              width: 35,
              height: 35,
            }}
          />
        </IconButton>
        {/* ------------------------------------------- */}
        {/* Message Dropdown */}
        {/* ------------------------------------------- */}
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            '& .MuiMenu-paper': {
              width: '200px',
            },
          }}
        >
          {
            user?.role === "ADMIN" ?
              <MenuItem divider component={Link} to={'/admin'}>
                <ListItemIcon>
                  <IconLayoutDashboard width={20} />
                </ListItemIcon>
                <ListItemText>
                  Admin Dashboard
                </ListItemText>
              </MenuItem>
              :
              <MenuItem divider component={Link} to={'/profile'}>
                <ListItemIcon>
                  <IconUser width={20} />
                </ListItemIcon>
                <ListItemText>
                  My Profile
                </ListItemText>
              </MenuItem>
          }

          {/*         <MenuItem>
            <ListItemIcon>
              <IconMail width={20} />
            </ListItemIcon>
            <ListItemText>My Account</ListItemText>
          </MenuItem>
          <MenuItem>
            <ListItemIcon>
              <IconListCheck width={20} />
            </ListItemIcon>
            <ListItemText>My Tasks</ListItemText>
        </MenuItem>*/}
          <Box mt={1} py={1} px={2}>
            <Button variant="outlined" color="primary" onClick={handleLogout} fullWidth>
              Logout
            </Button>
          </Box>
        </Menu>
      </Box>

    </>

  );
};

export default Profile;
