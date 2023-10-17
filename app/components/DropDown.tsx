import { ChangeEvent, FC } from "react";

type DropDownProps = {
  options: { name: string; value: string | number }[];
  initial: string | number;
  cb: (value: string | number) => void;
};

const DropDown: FC<DropDownProps> = ({ options, initial, cb }) => {
  const handleSelect = (e: ChangeEvent<HTMLSelectElement>) => {
    cb(e.target.value);
  };
  return (
    <select
      value={initial}
      onChange={handleSelect}
      className="rounded-md text-c5 bg-c2 py-1 px-2 md:hover:bg-c5 md:hover:text-c2 border-2 border-c3 cursor-pointer"
    >
      {options.map(({ name, value }) => (
        <option key={crypto.randomUUID()} value={value}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default DropDown;
