import { FC } from 'react';

type CancelButtonProps = {
  callback: () => void;
};

const CancelButton: FC<CancelButtonProps> = ({ callback }) => {
  return (
    <button className="bg-4 text-1 px-2 rounded-md" onClick={callback}>
      Avbryt
    </button>
  );
};

export default CancelButton;
