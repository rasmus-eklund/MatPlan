"use client";
import durations from "@/app/constants/animationDurations";
import { capitalize } from "@/app/utils/utils";
import { ShoppingListFilter, ShoppingListItem } from "@/types";
import { FC, useState } from "react";

type ItemProps = {
  item: ShoppingListItem;
  filter: ShoppingListFilter;
  handleCheckItems: (item: ShoppingListItem[]) => void;
};

const Item: FC<ItemProps> = ({ item, filter, handleCheckItems }) => {
  const { name, quantity, recipe, unit, checked } = item;
  const [animate, setAnimate] = useState(false);

  return (
    <li
      className={`flex items-center justify-between py-1 gap-2 bg-3 text-1 px-2 rounded-md transition-all duration-300 ${
        checked && "opacity-50"
      } ${animate && "opacity-0"}`}
    >
      <div className="flex gap-2">
        <input
          className="cursor-pointer"
          type="checkbox"
          checked={checked}
          onChange={() => {
            setAnimate((prev) => {
              setTimeout(() => {
                handleCheckItems([{ ...item, checked: !checked }]);
                setAnimate((prev) => !prev);
              }, durations.checkShoppingList);
              return !prev;
            });
          }}
        />
        <p className="select-none font-bold">{capitalize(name)}</p>
      </div>
      {!filter.hideRecipe && recipe && (
        <p className="grow overflow-hidden whitespace-nowrap overflow-ellipsis">
          {recipe}
        </p>
      )}
      <div className="flex gap-2 select-none">
        <p>{quantity}</p>
        <p>{unit}</p>
      </div>
    </li>
  );
};

export default Item;
