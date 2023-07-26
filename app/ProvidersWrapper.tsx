"use client";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import HeaderHome from "./components/HeaderHome";

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const usePathName = usePathname();
  return (
    <SessionProvider>
      {usePathName !== "/" && <Header />}
      {usePathName === "/" && <HeaderHome />}
      {usePathName !== "/" && <Navbar />}
      {children}
    </SessionProvider>
  );
}
