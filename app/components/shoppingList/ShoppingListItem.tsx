'use client';
import durations from '@/app/constants/animationDurations';
import { ShoppingListFilter, ShoppingListItem } from '@/types';
import { FC, useState } from 'react';

type ItemProps = {
  item: ShoppingListItem;
  filter: ShoppingListFilter;
  onCheck: (item: ShoppingListItem[]) => void;
};

const Item: FC<ItemProps> = ({ item, filter, onCheck }) => {
  const { name, quantity, recipe, unit, checked } = item;
  const [animate, setAnimate] = useState(false);

  return (
    <li
      className={`flex justify-between bg-4 text-2 px-2 rounded-md transition-opacity duration-200 ${
        (checked || animate) && 'opacity-50'
      }`}
    >
      <div className="flex gap-2">
        <input
          type="checkbox"
          checked={checked || animate}
          onChange={() => {
            setAnimate(prev => {
              setTimeout(() => {
                onCheck([{ ...item, checked: !checked }]);
              }, durations.checkShoppingList);
              return !prev;
            });
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
        {!filter.hideRecipe && recipe && (
          <p className="overflow-hidden whitespace-nowrap overflow-ellipsis">
            {recipe}
          </p>
        )}
      </div>
    </li>
  );
};

export default Item;
