import { FC } from 'react';

type CancelProps = {
  callback: () => void;
};

const Cancel: FC<CancelProps> = ({ callback }) => {
  return (
    <button className="bg-4 text-2 px-2 rounded-md" onClick={callback}>
      Avbryt
    </button>
  );
};

export default Cancel;
