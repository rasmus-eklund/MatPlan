import {
  ShoppingListFilter,
  ShoppingListItem,
  ShoppingListItemsGrouped,
} from "@/types";
import React, { FC, useState } from "react";
import Item from "./ShoppingListItem";
import MaximizeIcon from "../icons/MaximizeIcon";
import MinimizeIcon from "../icons/MinimizeIcon";
import { capitalize, groupByUnit, sortByChecked } from "../../utils/utils";
import durations from "@/app/constants/animationDurations";

type ShoppingListItemsGroupedProps = {
  group: ShoppingListItemsGrouped;
  handleCheckItems: (item: ShoppingListItem[]) => void;
  filter: ShoppingListFilter;
};

const ShoppingListItemsGrouped: FC<ShoppingListItemsGroupedProps> = ({
  group,
  handleCheckItems,
  filter,
}) => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  return group.group.length === 1 ? (
    <Item
      item={group.group[0]}
      filter={filter}
      handleCheckItems={handleCheckItems}
    />
  ) : (
    <li
      className={`flex flex-col bg-c3 rounded-md transition-opacity duration-200 ${
        (group.checked || animate) && "opacity-50"
      }`}
      key={group.name}
    >
      <div className="flex justify-between py-1 px-2 items-center">
        <div className="flex gap-2">
          <input
            className="cursor-pointer"
            type="checkbox"
            name="checkGroup"
            checked={group.checked || animate}
            id={`check-group-${group.name}`}
            onChange={() => {
              setAnimate((prev) => {
                setOpen(false);
                setTimeout(() => {
                  handleCheckItems(
                    group.group.map((i) => ({ ...i, checked: !group.checked })),
                  );
                }, durations.checkShoppingList);
                return !prev;
              });
            }}
          />
          <p className="text-c5 font-bold">{capitalize(group.name)}</p>
        </div>
        <div className="flex gap-1">
          <ul className="flex gap-1">
            {groupByUnit(group.group).map((i, index, arr) => (
              <li className="flex gap-1 text-c5 select-none" key={i.unit}>
                <p>{i.quantity}</p>
                <p>{i.unit}</p>
                {index < arr.length - 1 && <span>, </span>}
              </li>
            ))}
          </ul>
          <div className="cursor-pointer" onClick={() => setOpen(!open)}>
            {open ? (
              <MinimizeIcon className="h-6 fill-c5 hover:scale-125" />
            ) : (
              <MaximizeIcon className="h-6 fill-c5 hover:scale-125" />
            )}
          </div>
        </div>
      </div>
      {open && (
        <ul className="flex flex-col gap-1 bg-c5 p-2 rounded-b-md">
          {sortByChecked(group.group).map((item) => (
            <Item
              key={item.id}
              item={item}
              filter={filter}
              handleCheckItems={handleCheckItems}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default ShoppingListItemsGrouped;
