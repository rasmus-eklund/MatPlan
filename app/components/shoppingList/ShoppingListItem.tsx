'use client';
import durations from '@/app/constants/animationDurations';
import { capitalize } from '@/app/utils/utils';
import { ShoppingListFilter, ShoppingListItem } from '@/types';
import { FC, useState } from 'react';

type ItemProps = {
  item: ShoppingListItem;
  filter: ShoppingListFilter;
  handleCheckItems: (item: ShoppingListItem[]) => void;
};

const Item: FC<ItemProps> = ({ item, filter, handleCheckItems }) => {
  const { name, quantity, recipe, unit, checked } = item;
  const [animate, setAnimate] = useState(checked);

  return (
    <li
      className={`flex justify-between bg-4 text-2 px-2 rounded-md transition-opacity duration-200 ${
        (animate) && 'opacity-50'
      }`}
    >
      <div className="flex gap-2">
        <input
          className='cursor-pointer'
          type="checkbox"
          checked={animate}
          onChange={() => {
            setAnimate(prev => {
              setTimeout(() => {
                handleCheckItems([{ ...item, checked: !checked }]);
              }, durations.checkShoppingList);
              return !prev;
            });
          }}
        />
        <p className='select-none'>{capitalize(name)}</p>
      </div>
      <div className={`flex gap-2 justify-between ${!filter.hideRecipe && recipe && 'w-1/4'}`}>
        <div className="flex gap-2 select-none">
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
