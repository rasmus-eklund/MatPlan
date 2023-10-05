import { FC } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

type DeleteButtonProps = { callback: () => void };

const DeleteButton: FC<DeleteButtonProps> = ({ callback }) => {
  return (
    <FontAwesomeIcon
      onClick={() => callback()}
      icon={faTrashCan}
      size={'lg'}
      className={' hover:scale-110'}
      style={{ color: '#e24646' }}
    />
  );
};

export default DeleteButton;
