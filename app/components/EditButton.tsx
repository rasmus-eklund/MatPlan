import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil } from '@fortawesome/free-solid-svg-icons';

type Props = {
  callback: () => void;
};

const EditButton = ({ callback }: Props) => {
  return (
 <FontAwesomeIcon type='button' className={'hover:scale-110'}  onClick={callback} icon={faPencil} size='lg' style={{color: "#9db2bf",} }  />
  );
};

export default EditButton;
