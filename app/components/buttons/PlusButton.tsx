import { FC } from "react";
import TrashIcon from "../icons/TrashIcon";

type PlusButtonProps = { callback: () => void };

const PlusButton: FC<PlusButtonProps> = ({ callback }) => {
  return (
    <div className="flex h-6 cursor-pointer" onClick={() => callback()}>
      <TrashIcon className="fill-c5 hover:scale-125" />
    </div>
  );
};

export default PlusButton;
