import { FC } from 'react';
import TrashIcon from '../icons/TrashIcon';

type DeleteButtonProps = { callback: () => void };

const DeleteButton: FC<DeleteButtonProps> = ({ callback }) => {
  return (
    <div className='flex h-6 cursor-pointer' onClick={() => callback()}>
      <TrashIcon className="fill-1 hover:scale-125" />
    </div>
  );
};

export default DeleteButton;
