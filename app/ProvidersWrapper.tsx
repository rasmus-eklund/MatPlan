'use client';
import { SessionProvider } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Navbar from './components/Navbar';
import Header from './components/Header';
import { FC } from 'react';
import Footer from './components/Footer';

type ProvidersWrapperProps = {
  children: React.ReactNode;
};
const ProvidersWrapper: FC<ProvidersWrapperProps> = ({ children }) => {
  const usePathName = usePathname();
  return (
    <SessionProvider>
      {usePathName !== '/' && (
        <>
          <Header />
          <Navbar />
        </>
      )}
      {children}
      <Footer />
    </SessionProvider>
  );
};

export default ProvidersWrapper;
