'use client';
import { ShoppingListType } from '@/types';
import { useEffect, useState } from 'react';
import { updateCheckedItem } from './groupItems';

type Props = {
  item: ShoppingListType;
  checked: boolean;
};

const Item = ({ item, checked }: Props) => {
  const { name, quantity, from, unit } = item;
  const [check, setCheck] = useState(checked);
  useEffect(() => {
    setCheck(checked);
  }, [checked, item]);
  const handleChecking = (item: ShoppingListType) => {
    const newCheck = !check;
    setCheck(newCheck);
    updateCheckedItem(item, newCheck);
  };
  return (
    <li
      className={`flex justify-between order-1 bg-4 text-2 px-2 rounded-md ${
        check && 'opacity-50 order-2'
      }`}
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={check}
          onChange={() => handleChecking(item)}
        />
        <p className="text-left">{name}</p>
      </div>
      <div className={`flex gap-4 justify-between ${from && 'w-1/3'}`}>
        <div className="flex gap-2">
          <p>{quantity}</p>
          <p>{unit}</p>
        </div>
        {from && (
          <p className="overflow-hidden whitespace-nowrap overflow-ellipsis w-25">
            {from}
          </p>
        )}
      </div>
    </li>
  );
};

export default Item;
