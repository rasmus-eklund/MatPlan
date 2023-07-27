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
      className={`grid ${from ? 'grid-cols-3' : 'grid-cols-2'} px-2 order-1 ${
        check && 'opacity-50 order-3'
      }`}
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={check}
          onChange={() => handleChecking(item)}
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
