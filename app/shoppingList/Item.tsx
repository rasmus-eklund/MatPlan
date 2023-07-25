'use client';
import { ShoppingListType } from '@/types';
import { useState } from 'react';

type Props = {
  item: ShoppingListType;
};

const Item = ({ item: { name, quantity, from, unit } }: Props) => {
  const [check, setCheck] = useState(false);
  return (
    <li
      className={`grid grid-cols-4 px-5 order-1 ${
        check && 'opacity-50 order-2'
      }`}
    >
      <div className="flex gap-5">
        <input
          type="checkbox"
          checked={check}
          onChange={() => setCheck(!check)}
        />
        <p className="text-left flex-shrink-0">{name}</p>
      </div>
      <p className="text-left flex-shrink-0">{`${quantity} ${unit}`}</p>
      {from && <p className="text-center overflow-clip">{from}</p>}
    </li>
  );
};

export default Item;
