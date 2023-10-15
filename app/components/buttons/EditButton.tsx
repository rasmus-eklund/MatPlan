import { FC } from "react";
import EditIcon from "../icons/EditIcon";

type EditButtonProps = { callback: () => void };

const EditButton: FC<EditButtonProps> = ({ callback }) => {
  return (
    <div className="flex h-6 cursor-pointer" onClick={() => callback()}>
      <EditIcon className="fill-c4 hover:scale-125 hover:fill-c5 transition-all" />
    </div>
  );
};

export default EditButton;
