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
      key={crypto.randomUUID()}
      className={`grid grid-cols-4 px-5 ${check && 'opacity-50'}`}
    >
      <div className='flex gap-5'>
        <input
          type="checkbox"
          checked={check}
          onChange={() => setCheck(!check)}
        />
        <p className="text-center ">{name}</p>
      </div>
      <p className="text-center">{`${quantity} ${unit}`}</p>
      <p className="text-center">{from}</p>
    </li>
  );
};

export default Item;
