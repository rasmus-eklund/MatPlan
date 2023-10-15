import { FC } from "react";
import CloseIcon from "../icons/CloseIcon";

type CloseButtonProps = { callback: () => void };

const CloseButton: FC<CloseButtonProps> = ({ callback }) => {
  return (
    <div className="flex h-6 cursor-pointer" onClick={() => callback()}>
      <CloseIcon className="fill-c4 hover:scale-125 hover:fill-c5" />
    </div>
  );
};

export default CloseButton;
