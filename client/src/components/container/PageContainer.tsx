import { FC, ReactNode } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import Chatbot from '../../pages/chatbot/Chatbot';

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
    {((title === "orgchart") ||
      (title === "invitations") ||
      (title === "admin") || (title === "profile")) && <Chatbot />}
  </HelmetProvider>
);

export default PageContainer;
