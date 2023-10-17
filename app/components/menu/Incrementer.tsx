import { FC } from "react";
import PlusIcon from "../icons/PlusIcon";
import MinusIcon from "../icons/MinusIcon";

type IncrementerProps = {
  value: number;
  callback: (value: number) => void;
};

const Incrementer: FC<IncrementerProps> = ({ value, callback }) => {
  const handleChange = (minus: boolean) => {
    const newValue = minus ? Math.max(value - 1, 1) : value + 1;
    callback(newValue);
  };
  return (
    <div className="flex items-center p-2 gap-1 select-none">
      <button onClick={() => handleChange(true)}>
        <MinusIcon className="h-6 fill-c5 md:hover:fill-c4" />
      </button>
      <p className="text-lg">{value}</p>
      <button onClick={() => handleChange(false)}>
        <PlusIcon className="h-6 fill-c5 md:hover:fill-c4" />
      </button>
    </div>
  );
};

export default Incrementer;
