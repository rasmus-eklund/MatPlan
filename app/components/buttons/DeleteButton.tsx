import { FC, useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import durations from "@/app/constants/animationDurations";

type DeleteButtonProps = { callback: () => void };

const DeleteButton: FC<DeleteButtonProps> = ({ callback }) => {
  const [animate, setAnimate] = useState(false);
  const handleClick = () => {
    setAnimate((prev) => {
      setTimeout(() => {
        callback();
        setAnimate((prev) => !prev);
      }, durations.deleteItem);
      return !prev;
    });
  };
  return (
    <button onClick={handleClick}>
      <TrashIcon
        className={`fill-1 cursor-pointer h-6 hover:scale-125 transition-all ease-in-out ${
          animate && "scale-0"
        }`}
      />
    </button>
  );
};

export default DeleteButton;
