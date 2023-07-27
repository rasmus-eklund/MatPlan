import { faCircleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  callback: () => void;
  bg: number;
};

const DownArrow = ({ callback, bg }: Props) => {
  return (
    <FontAwesomeIcon
      className={`bg-${bg} hover:cursor-pointer rounded-full border-2`}
      onClick={e => {
        e.preventDefault();
        callback();
      }}
      icon={faCircleDown}
      size="xl"
      style={{ color: '#9db2bf' }}
    />
  );
};

export default DownArrow;
