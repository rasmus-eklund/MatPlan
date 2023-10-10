import { FC } from 'react';

type ButtonProps = {
  name: string;
  callback: () => void;
};

const Button: FC<ButtonProps> = ({ name, callback }) => {
  return (
    <button className="bg-4 text-1 px-2 rounded-md" onClick={callback}>
      {name}
    </button>
  );
};

export default Button;
