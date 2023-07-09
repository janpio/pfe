import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import {
  ListItemIcon,
  ListItem,
  List,
  ListItemText,
  Button,
  useTheme,
  Theme,
} from '@mui/material';
import Badge, { BadgeProps } from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import { useStore } from '../../../../state/store';
import { MenuItemType } from '../MenuItems';

type NavItemProps = {
  item: MenuItemType,
  pathDirect?: string,
}
const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: 30,
    top: 22,
    padding: '0 5px',

  },
}));

const NavItem: FC<NavItemProps> = ({ item, pathDirect }) => {

  const user = useStore((state: any) => state.user)
  const theme = useTheme<Theme>();

  return (
    <List component="li" disablePadding key={item.id}>
      <StyledBadge invisible={item?.title != "Invitations"}
        showZero={false}
        badgeContent={item?.title === "Invitations" && user?.ActivityInvitationReceived?.length}
        color="error">
        <ListItem
          button
          component={item.external ? 'a' : NavLink}
          to={item.href}
          href={item.external ? item.href : ''}
          disabled={item.disabled}
          selected={pathDirect === item.href}
          target={item.external ? '_blank' : ''}
          sx={{
            width: '230px',//200
            whiteSpace: 'nowrap',
            marginBottom: '2px',
            padding: '8px 10px',
            borderRadius: '8px',
            color: theme.palette.text.secondary,
            paddingLeft: '10px',
            '&:hover': {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.primary.main,
            },
            '&.Mui-selected': {
              color: 'white',
              backgroundColor: theme.palette.primary.main,
              '&:hover': {
                backgroundColor: theme.palette.primary.main,
                color: 'white',
              },
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: '36px', p: '3px 0', color: 'inherit' }}>
            {item.icon}
          </ListItemIcon>
          <ListItemText>{item.title}</ListItemText>
        </ListItem>
      </StyledBadge>
    </List>

  );
};

export default NavItem;
