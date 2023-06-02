import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin, IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconBrandAsana
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  /*{
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },*/
  {
    id: uniqueId(),
    title: 'Teams',
    icon: IconBrandAsana,
    href: '/teams',
  },
  {
    id: uniqueId(),
    title: 'Invitations',
    icon: IconLayoutDashboard,
    href: '/Invitations',
  },
  /* {
     navlabel: true,
     subheader: 'Utilities',
   },
   {
     id: uniqueId(),
     title: 'Typography',
     icon: IconTypography,
     href: '/ui/typography',
   },
   {
     id: uniqueId(),
     title: 'Shadow',
     icon: IconCopy,
     href: '/ui/shadow',
   },*/
  /* {
      navlabel: true,
      subheader: 'Auth',
    },
    {
      id: uniqueId(),
      title: 'Login',
      icon: IconLogin,
      href: '/auth/login',
    },
    {
      id: uniqueId(),
      title: 'Register',
      icon: IconUserPlus,
      href: '/auth/register',
    },
/*{
navlabel: true,
subheader: 'Extra',
},
{
id: uniqueId(),
title: 'Icons',
icon: IconMoodHappy,
href: '/icons',
},
{
id: uniqueId(),
title: 'Sample Page',
icon: IconAperture,
href: '/sample-page',
},*/
];

export default Menuitems;
