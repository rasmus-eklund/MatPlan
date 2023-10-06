import { IngredientBare } from '@/types';
import React, { useEffect, useState } from 'react';

type Props = {
  ing: IngredientBare;
  home: boolean;
  showHome: boolean;
  onCheck: (check: boolean) => Promise<void>;
};

const NoEditItem = ({
  ing: { name, quantity, unit },
  home,
  showHome,
  onCheck,
}: Props) => {
  const [check, setChecked] = useState(home);
  const handleChange = async () => {
    setChecked(!check);
    await onCheck(!check);
  };

  useEffect(() => {
    setChecked(home);
  }, [home]);

  return (
    <li className=" flex gap-5 items-center px-4 py-1 bg-4 text-2 font-medium rounded-md">
      <p className="grow">{name}</p>
      <div className="flex gap-2 justify-self-end">
        <p>{quantity}</p>
        <p>{unit}</p>
      </div>
      {/* {showHome && (
        <>
          <label htmlFor="home">Hemma</label>
          <input
            type="checkbox"
            checked={check}
            name="home"
            id="home"
            onChange={handleChange}
          />
        </>
      )} */}
    </li>
  );
};

export default NoEditItem;
