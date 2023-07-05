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
    subheader: 'Acceuil', //Home
  },
  {
    id: uniqueId(),
    title: " Mon Profil",  //teams
    icon: <IconUserCircle />,
    href: '/profile',
  },
  {
    id: uniqueId(),
    title: "Organigramme des équipes",  //teams
    icon: <GroupsOutlinedIcon />,
    href: '/teams',
  },
  {
    id: uniqueId(),
    title: "Les Invitations des activités",
    icon: <ConnectWithoutContactOutlinedIcon />,
    href: '/Invitations',
  },
];

export default Menuitems;
