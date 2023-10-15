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
      className={`bg-c2 text-c5 px-2 border-2 border-c2 rounded-md cursor-pointer hover:bg-c5 hover:text-c2 transition-all ${
        animate && "scale-110"
      }`}
      onClick={handleClick}
    >
      {name}
    </button>
  );
};

export default Button;
