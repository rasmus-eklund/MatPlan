import { FC } from 'react';
import HomeIcon from '../icons/HomeIcon';

type AddHomeButtonProps = {
  home: boolean;
  callback: (checked: boolean) => void;
};

const AddHomeButton: FC<AddHomeButtonProps> = ({ home, callback }) => {
  return (
    <button onClick={() => callback(!home)}>
      <HomeIcon className={`h-8 ${home ? 'fill-1' : 'fill-2'}`} />
    </button>
  );
};

export default AddHomeButton;
