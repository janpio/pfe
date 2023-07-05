import {
    IconLayoutDashboard,
} from '@tabler/icons';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import { uniqueId } from 'lodash';
import { MenuItemType } from './MenuItems';

const adminItems: MenuItemType[] = [
    {
        navlabel: true,
        subheader: 'Acceuil', //Home
    },

    {
        id: uniqueId(),
        title: "Admin Dashboard",
        icon: <IconLayoutDashboard />,
        href: '/admin',
    },

    {
        id: uniqueId(),
        title: "Organigramme des équipes",  //teams
        icon: <GroupsOutlinedIcon />,
        href: '/teams',
    },
];

export default adminItems;
