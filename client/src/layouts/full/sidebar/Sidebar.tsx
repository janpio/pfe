import { useMediaQuery, Box, Drawer, Theme } from '@mui/material';
import Logo from '../shared/logo/Logo';
import SidebarItems from './SidebarItems';
import { FC } from 'react';

export interface SidebarProps {
  isSidebarOpen: boolean;
  isMobileSidebarOpen: boolean;
  onSidebarClose: () => void;
}

const Sidebar: FC<SidebarProps> = (props) => {

  const lgUp = useMediaQuery<Theme>((theme) => theme.breakpoints.up("lg"));

  const sidebarWidth = '270px';

  //for desktop devices
  if (lgUp) {
    return (
      <Box
        sx={{
          width: 270,
          flexShrink: 0,
        }}
      >
        <Drawer
          anchor="left"
          open={props.isSidebarOpen}
          variant="permanent"
          PaperProps={{
            sx: {
              width: sidebarWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Box
            sx={{
              height: '100%',
            }}
          >
            <Box px={3}>
              <Logo />
            </Box>
            <Box>
              <SidebarItems />
            </Box>

          </Box>
        </Drawer>
      </Box>
    );
  }

  //for mobile devices
  return (
    <Drawer
      anchor="left"
      open={props.isMobileSidebarOpen}
      onClose={props.onSidebarClose}
      variant="temporary"
      PaperProps={{
        sx: {
          width: sidebarWidth,
          boxShadow: (theme) => theme.shadows[8],
        },
      }}
    >
      <Box px={2}>
        <Logo />
      </Box>
      <SidebarItems />
    </Drawer>
  );
};

export default Sidebar;
