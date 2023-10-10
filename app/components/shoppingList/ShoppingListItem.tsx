'use client';
import { ShoppingListFilter, ShoppingListItem } from '@/types';
import { FC, useState } from 'react';

type ItemProps = {
  item: ShoppingListItem;
  filter: ShoppingListFilter;
  onCheck: (item: ShoppingListItem[]) => void;
};

const Item: FC<ItemProps> = ({ item, filter, onCheck }) => {
  const { name, quantity, from, unit, checked } = item;

  return (
    <li
      className={`flex justify-between bg-4 text-2 px-2 rounded-md transition-opacity duration-200 ${
        checked && 'opacity-50'
      }`}
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={checked}
          onChange={() => {
            setTimeout(() => {
              onCheck([{ ...item, checked: !checked }]);
            }, 300);
          }}
        />
        <p className="text-left">{name}</p>
      </div>
      <div
        className={`flex gap-2 justify-between ${
          !filter.hideRecipe && 'w-1/4'
        }`}
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
