import { FC, useState } from "react";
import HomeIcon from "../icons/HomeIcon";

type AddHomeButtonProps = {
  home: boolean;
  callback: (checked: boolean) => void;
};

const AddHomeButton: FC<AddHomeButtonProps> = ({ home, callback }) => {
  const [animate, setAnimate] = useState(false);
  const handleClick = () => {
    setAnimate((prev) => {
      setTimeout(() => {
        callback(!home);
        setAnimate((prev) => !prev);
      }, 300);
      return !prev;
    });
  };
  return (
    <button disabled={animate} onClick={handleClick}>
      <HomeIcon
        className={`h-6 ${
          home ? "fill-1" : "fill-5"
        } bg-3 rounded-lg p-1 transition-all ${
          animate && "-translate-y-1 scale-110"
        }`}
      />
    </button>
  );
};

export default AddHomeButton;
