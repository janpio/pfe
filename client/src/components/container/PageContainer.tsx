import { FC, ReactNode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Chatbot from '../../pages/chatbot/Chatbot';

// we use hel!met to optimize a  bit the SEO

type PageContainerProps = {
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
    {title === "Login" ? <></> : <Chatbot />}
  </HelmetProvider>
);

export default PageContainer;
