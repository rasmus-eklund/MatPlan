import { FC, useState } from 'react';

type IncrementerProps = {
  initialValue: number;
  callback: (value: number) => Promise<void>;
};

const Incrementer: FC<IncrementerProps> = ({ initialValue, callback }) => {
  const [value, setValue] = useState(initialValue);
  const handleChange = (minus: boolean) => {
    const newValue = minus ? Math.max(value - 1, 1) : value + 1;
    callback(newValue).then(() => setValue(newValue));
  };
  return (
    <div className="flex items-center p-2 gap-1">
      <button
        onClick={() => handleChange(true)}
        className="rounded-full bg-3 w-6 h-6"
      >
        -
      </button>
      <p className="text-lg">{value}</p>
      <button
        onClick={() => handleChange(false)}
        className="rounded-full bg-3 w-6 h-6"
      >
        +
      </button>
    </div>
  );
};

export default Incrementer;
