import { Ingredient } from '@/types';
import React, { useEffect, useState } from 'react';
import { addHome, removeHome } from '../db/home';

type Props = {
  ing: Ingredient;
  home: boolean;
  showHome: boolean;
};

const NoEditItem = ({
  ing: { name, quantity, unit },
  home,
  showHome,
}: Props) => {
  const [check, setChecked] = useState(home);
  useEffect(() => {
    if (check) {
      addHome(name);
      console.log(check);
    } else {
      console.log(check);
      // removeHome(name);
    }
  }, [check, name]);

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
            onChange={() => setChecked(!check)}
          />
        </>
      )}
    </li>
  );
};

export default NoEditItem;
