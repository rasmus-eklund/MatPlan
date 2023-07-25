import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheck,
  faCircleCheck,
  faPencil,
} from '@fortawesome/free-solid-svg-icons';

type Props = {
  callback: () => void;
};

const SaveButton = ({ callback }: Props) => {
  return (
    <FontAwesomeIcon
      type="button"
      className={'hover:scale-110'}
      onClick={callback}
      icon={faCircleCheck}
      size="lg"
      style={{ color: '#09d356' }}
    />
  );
};

export default SaveButton;
