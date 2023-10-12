import { FC } from "react";
import EditIcon from "../icons/EditIcon";

type EditButtonProps = { callback: () => void };

const EditButton: FC<EditButtonProps> = ({ callback }) => {
  return (
    <div className="flex h-6 cursor-pointer" onClick={() => callback()}>
      <EditIcon className="fill-1 hover:scale-125" />
    </div>
  );
};

export default EditButton;
