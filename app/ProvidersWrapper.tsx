"use client";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "./components/layout/Navbar";
import Header from "./components/layout/Header";
import { FC } from "react";
import Footer from "./components/layout/Footer";

type ProvidersWrapperProps = {
  children: React.ReactNode;
};
const ProvidersWrapper: FC<ProvidersWrapperProps> = ({ children }) => {
  const usePathName = usePathname();
  return (
    <SessionProvider>
      {usePathName !== "/" && (
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
