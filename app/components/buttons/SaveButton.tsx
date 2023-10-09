import { FC } from 'react';

type SaveButtonProps = {
  callback: () => void;
};

const SaveButton: FC<SaveButtonProps> = ({ callback }) => {
  return (
    <button className="bg-4 text-1 px-2 rounded-md" onClick={callback}>
      Spara
    </button>
  );
};

export default SaveButton;
