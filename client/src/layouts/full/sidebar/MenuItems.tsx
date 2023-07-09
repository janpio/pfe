import { IconUserCircle } from '@tabler/icons-react';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ConnectWithoutContactOutlinedIcon from '@mui/icons-material/ConnectWithoutContactOutlined';
import { uniqueId } from 'lodash';

export type MenuItemType = {
  id?: string;
  title?: string;
  icon?: JSX.Element;
  href?: string;
  subheader?: string;
  navlabel?: boolean;
  external?: boolean | undefined;
  disabled?: boolean | undefined;
}

const Menuitems: MenuItemType[] = [
  {
    navlabel: true,
    subheader: 'Home',
  },
  {
    id: uniqueId(),
    title: " My Profil",
    icon: <IconUserCircle />,
    href: '/profile',
  },
  {
    id: uniqueId(),
    title: "Organizational Chart",
    icon: <GroupsOutlinedIcon />,
    href: '/teams',
  },
  {
    id: uniqueId(),
    title: "Activity Invitations",
    icon: <ConnectWithoutContactOutlinedIcon />,
    href: '/Invitations',
  },
];

export default Menuitems;
