import LoginButton from "../buttons/LoginButton";
import Image from "next/image";

const Header = () => {
  return (
    <header className="bg-1 flex justify-between text-white items-center">
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
  );
};

export default Header;
