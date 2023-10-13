import durations from "@/app/constants/animationDurations";
import { FC, useState } from "react";

type ButtonProps = {
  name: string;
  callback: () => void;
};

const Button: FC<ButtonProps> = ({ name, callback }) => {
  const [animate, setAnimate] = useState(false);
  const handleClick = () => {
    setAnimate((prev) => {
      setTimeout(() => {
        callback();
        setAnimate((prev) => !prev);
      }, durations.button);
      return !prev;
    });
  };
  return (
    <button
      disabled={animate}
      className={`bg-4 text-1 px-2 border-[2px] border-4 rounded-md cursor-pointer hover:bg-1 hover:text-4 transition-all ${
        animate && "scale-110"
      }`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
