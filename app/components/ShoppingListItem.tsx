'use client';
import { ShoppingListFilter, ShoppingListItem } from '@/types';
import { FC, useState } from 'react';

type ItemProps = {
  item: ShoppingListItem;
  filter: ShoppingListFilter;
};

const Item: FC<ItemProps> = ({ item, filter }) => {
  const { name, quantity, from, unit, checked } = item;
  const [check, setCheck] = useState(checked);
  const [moved, setMoved] = useState(false);

  return (
    <li
      className={`flex justify-between order-1 bg-4 text-2 px-2 rounded-md transition-opacity duration-200 ${
        check && 'opacity-50'
      } ${moved && 'order-2'}
      }`}
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={check}
          onChange={() => {
            setTimeout(() => setMoved(!moved), 300);
            setCheck(!check);
          }}
        />
        <p className="text-left">{name}</p>
      </div>
      <div
        className={`flex gap-2 justify-between ${!filter.hideRecipe && 'w-1/4'}`}
      >
        <div className="flex gap-2">
          <p>{quantity}</p>
          <p>{unit}</p>
        </div>
        {!filter.hideRecipe && (
          <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {from === 'extraItem' ? 'Egen' : from}
          </p>
        )}
      </div>
    </li>
  );
};

export default Item;
