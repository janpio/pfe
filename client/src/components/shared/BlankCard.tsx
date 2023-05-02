import { Card } from '@mui/material';
import { ReactNode } from 'react';
import { FC } from 'react';

interface BlankCardProps {
  children: ReactNode;
  className?: string
}

const BlankCard: FC<BlankCardProps> = ({ children, className }) => {
  return (
    <Card
      sx={{ p: 0, position: 'relative' }}
      className={className}
      elevation={9}
      variant={undefined}
    >
      {children}
    </Card>
  );
};

export default BlankCard;
