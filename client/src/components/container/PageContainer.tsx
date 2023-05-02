import { FC, ReactNode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';

interface PageContainerProps {
  title: string;
  description: string;
  children: ReactNode;
}

const PageContainer: FC<PageContainerProps> = ({ title, description, children }) => (
  <HelmetProvider>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    {children}
  </HelmetProvider>
);

export default PageContainer;
