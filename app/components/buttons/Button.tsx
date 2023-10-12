import { FC } from 'react';

type ButtonProps = {
  name: string;
  callback: () => void;
};

const Button: FC<ButtonProps> = ({ name, callback }) => {
  return (
    <button className="bg-4 text-1 px-2 border-[2px] border-4 rounded-md cursor-pointer hover:bg-1 hover:text-4" onClick={callback}>
      {name}
    </button>
  );
};

export default Button;
