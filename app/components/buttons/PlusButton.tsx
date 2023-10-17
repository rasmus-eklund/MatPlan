import { FC } from "react";
import PlusIcon from "../icons/PlusIcon";

type PlusButtonProps = { callback: () => void };

const PlusButton: FC<PlusButtonProps> = ({ callback }) => {
  return (
    <div className="flex h-6 cursor-pointer" onClick={() => callback()}>
      <PlusIcon className="fill-c5 hover:scale-125" />
    </div>
  );
};

export default PlusButton;
