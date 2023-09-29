import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faX } from '@fortawesome/free-solid-svg-icons';

type Props = {
  callback: () => void;
};

const Cancel = ({ callback }: Props) => {
  return (
    <FontAwesomeIcon
      type="button"
      className={'hover:scale-110'}
      onClick={callback}
      icon={faX}
      size="lg"
      style={{ color: '#e24646' }}
    />
  );
};

export default Cancel;
