import { Ingredient } from '@/types';
import React, { useEffect, useState } from 'react';

type Props = {
  ing: Ingredient;
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

  useEffect(() => {setChecked(home)}, [home])

  return (
    <li className="border-2 flex gap-5 items-center p-1">
      <p className="grow">{name}</p>
      <div className="flex gap-2 justify-self-end">
        <p>{quantity}</p>
        <p>{unit}</p>
      </div>
      {showHome && (
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
      )}
    </li>
  );
};

export default NoEditItem;
