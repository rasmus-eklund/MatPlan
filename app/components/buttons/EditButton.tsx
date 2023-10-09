import { FC } from 'react';

type EditButtonProps = {
  callback: () => void;
};

const EditButton: FC<EditButtonProps> = ({ callback }) => {
  return (
    <button className="bg-4 text-1 px-2 rounded-md" onClick={() => callback()}>
      Ändra
    </button>
  );
};

export default EditButton;
