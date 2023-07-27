import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

type Props = { callback: () => void };

const DeleteButton = ({ callback }: Props) => {
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
