"use client";
import LoginButton from "../buttons/LoginButton";
import Image from "next/image";
import Navbar from "./Navbar";
import { usePathname } from "next/navigation";

const Header = () => {
  const usePathName = usePathname();
  return (
    <>
      {usePathName !== "/" && (
        <>
          <header className="bg-c5 flex justify-between items-center">
            <Image
              className={"px-2"}
              src={"/logo-color.svg"}
              alt="MatPlan logo"
              width={150}
              height={80}
            />
            <div className="justify-items-end">
              <LoginButton />
            </div>
          </header>
          <Navbar />
        </>
      )}
    </>
  );
};

export default Header;
