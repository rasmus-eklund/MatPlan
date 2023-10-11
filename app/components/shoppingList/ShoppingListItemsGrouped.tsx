import {
  ShoppingListFilter,
  ShoppingListItem,
  ShoppingListItemsGrouped,
} from '@/types';
import React, { FC, useState } from 'react';
import Item from './ShoppingListItem';
import MaximizeIcon from '../icons/MaximizeIcon';
import MinimizeIcon from '../icons/MinimizeIcon';
import {
  capitalize,
  groupByUnit,
  sortShoppingListByChecked,
} from '../../utils/utils';

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
        <div className="flex gap-2" onClick={() => setOpen(!open)}>
          <ul className="flex gap-1">
            {groupByUnit(group.group).map((i, index, arr) => (
              <li className="flex gap-1" key={i.unit}>
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
          {sortShoppingListByChecked(group.group).map(item => (
            <Item key={item.id} item={item} filter={filter} onCheck={onCheck} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ShoppingListItemsGrouped;
