import { Link } from 'react-router-dom';
import FisLogo from '/src/assets/images/logos/FIS.png';
import { styled } from '@mui/material';

const LinkStyled = styled(Link)(() => ({
  overflow: 'hidden',
  display: 'block',
  paddingTop: 25
}));

const Logo = () => {
  return (
    <LinkStyled to="/teams">
      <img src={FisLogo} alt="logo" height='80%' width='80%' />
    </LinkStyled>
  )
};

export default Logo;
