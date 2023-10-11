import {
  ShoppingListFilter,
  ShoppingListItem,
  ShoppingListItemsGrouped,
} from '@/types';
import React, { FC, useState } from 'react';
import Item from './ShoppingListItem';
import MaximizeIcon from '../icons/MaximizeIcon';
import MinimizeIcon from '../icons/MinimizeIcon';
import { capitalize, groupByUnit, sortByChecked } from '../../utils/utils';
import durations from '@/app/constants/animationDurations';

type ShoppingListItemsGroupedProps = {
  group: ShoppingListItemsGrouped;
  onCheck: (item: ShoppingListItem[]) => void;
  filter: ShoppingListFilter;
};

const ShoppingListItemsGrouped: FC<ShoppingListItemsGroupedProps> = ({
  group,
  onCheck,
  filter,
}) => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  return (
    <li
      className={`flex flex-col bg-3 px-2 rounded-md gap-1 transition-opacity duration-200 ${
        (group.checked || animate) && 'opacity-50'
      } ${open && 'py-1'}`}
      key={group.name}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="checkGroup"
            checked={group.checked || animate}
            id={`check-group-${group.name}`}
            onChange={() => {
              setAnimate(prev => {
                setOpen(false);
                setTimeout(() => {
                  onCheck(
                    group.group.map(i => ({ ...i, checked: !group.checked }))
                  );
                }, durations.checkShoppingList);
                return !prev;
              });
            }}
          />
          <p className="text-1">{capitalize(group.name)}</p>
        </div>
        <div className="flex gap-2" onClick={() => setOpen(!open)}>
          <ul className="flex gap-1">
            {groupByUnit(group.group).map((i, index, arr) => (
              <li className="flex gap-1 text-1" key={i.unit}>
                <p>{i.quantity}</p>
                <p>{i.unit}</p>
                {index < arr.length - 1 && <span>, </span>}
              </li>
            ))}
          </ul>
          {open ? (
            <MinimizeIcon className="h-6 fill-1 hover:scale-110" />
          ) : (
            <MaximizeIcon className="h-6 fill-1 hover:scale-110" />
          )}
        </div>
      </div>
      {open && (
        <ul className="flex flex-col gap-1">
          {sortByChecked(group.group).map(item => (
            <Item key={item.id} item={item} filter={filter} onCheck={onCheck} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ShoppingListItemsGrouped;
