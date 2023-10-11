import { FC } from 'react';
import TrashIcon from '../icons/TrashIcon';

type PlusButtonProps = { callback: () => void };

const PlusButton: FC<PlusButtonProps> = ({ callback }) => {
  return (
    <div className="flex h-6" onClick={() => callback()}>
      <TrashIcon className="fill-1 hover:scale-125" />
    </div>
  );
};

export default PlusButton;