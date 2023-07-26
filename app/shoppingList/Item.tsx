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
      className={`grid ${from ? 'grid-cols-3' : 'grid-cols-2'} px-2 order-1 ${
        check && 'opacity-50 order-3'
      }`}
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={check}
          onChange={() => setCheck(!check)}
        />
        <p className="text-left flex-shrink-0">{name}</p>
      </div>
      <p
        className={`text-left ${!from && 'justify-self-end'} flex-shrink-0`}
      >{`${quantity} ${unit}`}</p>
      {from && (
        <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
          {from}
        </p>
      )}
    </li>
  );
};

export default Item;
