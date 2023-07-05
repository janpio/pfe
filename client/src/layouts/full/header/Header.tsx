import { useState } from 'react';
import {
  Box, AppBar, Toolbar, styled, Stack,
  IconButton, Badge, Menu, MenuItem
  , ListItemIcon, Typography, Avatar
} from '@mui/material';
import Profile from './Profile';
import { IconBellRinging, IconMenu } from '@tabler/icons';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useStore } from '../../../state/store';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { getInvitationsReceived, changeHasRead } from '../../../features/api/api';
import { Link } from 'react-router-dom';

const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: 'none',
  background: theme.palette.background.paper,
  justifyContent: 'center',
  backdropFilter: 'blur(4px)',
  [theme.breakpoints.up('lg')]: {
    minHeight: '70px',
  },
}));
const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: '100%',
  color: theme.palette.text.secondary,
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -1.5,
    top: 0,
  },
}));

type HeaderProps = {
  toggleMobileSidebar: () => void;
  toggleSidebar: () => void;
}

const Header = (props: HeaderProps) => {

  const user = useStore((state: any) => state?.user)
  const token = useStore((state: any) => state?.token)

  const { data: invisReceived } = useQuery('invisReceived', () =>
    getInvitationsReceived(user?.id, token))

  const queryClient = useQueryClient()

  const { mutate: ChangeHasRead } =
    useMutation(([invitationId, hasRead]: [invitationId: number, hasRead: boolean]) =>
      changeHasRead(invitationId, hasRead, token), {
      onSuccess: () => {
        queryClient.invalidateQueries('invisReceived')
        console.log('success')
      }
    });


  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const getUnseenInvitationsNumber = () => {
    const array = invisReceived && invisReceived?.filter((inv) => inv?.hasRead == false)
    return array
  }

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>
        <IconButton
          size="large"
          aria-label="show notifications"
          color="inherit"
          aria-controls="msgs-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          <StyledBadge
            color="error"
            badgeContent={getUnseenInvitationsNumber()?.length}
          // invisible={seen}
          >
            <IconBellRinging size="21" stroke="1.5" />
          </StyledBadge>

        </IconButton>
        <Menu
          id="msgs-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          sx={{
            position: 'absolute',
            top: '-20px',
            left: '20rem',
            '& .MuiMenu-paper': {
              minWidth: '100px',
              border: '1px solid black',
            },
          }}
        >
          {invisReceived && invisReceived?.map((inv: any) =>
            <Box display={'flex'} key={inv?.id}
              paddingRight={1.5}
              justifyContent={'space-between'}
              alignItems={'center'}>
              <MenuItem >
                <ListItemIcon>
                  <Avatar
                    src={inv.sender.image}
                    alt={"user-avatar"}
                    sx={{
                      border: '4px solid #4ace3c',
                      width: 40,
                      height: 40,
                      mr: 2
                    }}
                  />
                </ListItemIcon>
                <Typography component={Link} to={'/invitations'}
                  variant={inv.hasRead ? "body1" : "h6"}
                  sx={{ textDecoration: 'none', color: 'black' }}
                >
                  {inv.sender.name} Vous envoyez une invitation pour une activité
                </Typography>
              </MenuItem>
              <IconButton onClick={() => {
                ChangeHasRead([inv?.id, inv.hasRead])
              }}>
                {inv.hasRead ? <VisibilityIcon /> :
                  <VisibilityOffIcon />}
              </IconButton>
            </Box>
          )}
        </Menu>
        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Header;
