import { faCircleUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

type Props = {
  callback: () => void;
  bg: number;
};

const UpArrow = ({ callback, bg }: Props) => {
  return (
    <div>
      <FontAwesomeIcon
        className={`bg-${bg} hover:cursor-pointer rounded-full border-2`}
        onClick={e => {
          e.preventDefault();
          callback();
        }}
        icon={faCircleUp}
        size="xl"
        style={{ color: '#9db2bf' }}
      />
    </div>
  );
};

export default UpArrow;
