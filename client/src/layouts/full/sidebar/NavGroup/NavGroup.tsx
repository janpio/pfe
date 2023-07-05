// mui imports
import { ListSubheader, styled } from '@mui/material';
import { FC } from 'react';

type NavGroupProps = {
  item: {
    navlabel?: boolean;
    subheader?: string;
  };
}

const NavGroup: FC<NavGroupProps> = ({ item }) => {
  const ListSubheaderStyle = styled(ListSubheader)(({ theme }) => ({
    ...theme.typography.overline,
    fontWeight: '700',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(0),
    color: theme.palette.text.primary,
    lineHeight: '26px',
    padding: '3px 12px',
  }));
  return (
    <ListSubheaderStyle>{item.subheader}</ListSubheaderStyle>
  );
};

export default NavGroup;
