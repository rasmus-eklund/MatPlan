"use client";
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Navbar from "./components/Navbar";
import Header from "./components/Header";

export default function ProvidersWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const usePathName = usePathname();
  return (
    <SessionProvider>
      <Header />
      {usePathName !== "/" && <Navbar />}
      {children}
    </SessionProvider>
  );
}
