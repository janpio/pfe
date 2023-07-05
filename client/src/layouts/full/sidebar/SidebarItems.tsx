import Menuitems from './MenuItems';
import { useLocation } from 'react-router';
import { Box, List } from '@mui/material';
import NavItem from './NavItem';
import NavGroup from './NavGroup/NavGroup';
import adminItems from './adminMenu';
import { useStore } from '../../../state/store';

const SidebarItems = () => {

  const user = useStore((state: any) => state?.user)

  const { pathname } = useLocation();
  const pathDirect = pathname;

  return (
    <Box sx={{ px: 3 }}>
      {user?.role === "USER" ? <List sx={{ pt: 0 }} className="sidebarNav">
        {Menuitems?.map((item) => {
          if (item?.subheader) {
            return <NavGroup item={item} key={item.subheader} />;
          } else {
            return (
              <NavItem item={item} key={item.id} pathDirect={pathDirect} />
            );
          }
        })}
      </List> :
        <List sx={{ pt: 0 }} className="sidebarNav">
          {adminItems?.map((item) => {
            if (item?.subheader) {
              return <NavGroup item={item} key={item.subheader} />;
            } else {
              return (
                <NavItem item={item} key={item.id} pathDirect={pathDirect} />
              );
            }
          })}
        </List>

      }
    </Box>
  );
};
export default SidebarItems;
