import {
  ShoppingListFilter,
  ShoppingListItem,
  ShoppingListItemsGrouped,
} from '@/types';
import React, { useState } from 'react';
import Item from './ShoppingListItem';
import MaximizeIcon from '../icons/MaximizeIcon';
import MinimizeIcon from '../icons/MinimizeIcon';
import { capitalize, sortShoppingListByChecked } from '../../utils/utils';

type Props = {
  group: ShoppingListItemsGrouped;
  onCheck: (item: ShoppingListItem[]) => void;
  filter: ShoppingListFilter;
};

const ShoppingListItemsGrouped = ({ group, onCheck, filter }: Props) => {
  const [open, setOpen] = useState(false);
  return (
    <li
      className={`flex flex-col bg-3 px-2 py-1 rounded-md gap-1 transition-opacity duration-200 ${
        group.checked && 'opacity-50'
      }`}
      key={group.name}
    >
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <input
            type="checkbox"
            name="checkGroup"
            checked={group.checked}
            id={`check-group-${group.name}`}
            onChange={() => {
              setOpen(false);
              setTimeout(() => {
                onCheck(
                  group.group.map(i => ({ ...i, checked: !group.checked }))
                );
              }, 300);
            }}
          />
          <p>{capitalize(group.name)}</p>
        </div>
        <div onClick={() => setOpen(!open)}>
          {open ? (
            <MinimizeIcon className="h-6 fill-1 hover:scale-110" />
          ) : (
            <MaximizeIcon className="h-6 fill-1 hover:scale-110" />
          )}
        </div>
      </div>
      {open && (
        <ul className="flex flex-col gap-1">
          {sortShoppingListByChecked(group.group).map(item => (
            <Item key={item.id} item={item} filter={filter} onCheck={onCheck} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ShoppingListItemsGrouped;
