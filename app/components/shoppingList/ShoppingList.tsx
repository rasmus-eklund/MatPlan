import { ShoppingListFilter, ShoppingListItem } from "@/types";
import { FC } from "react";
import Item from "./ShoppingListItem";
import {
  groupShoppingListItems,
  sortByChecked,
  sortBySubcategory,
} from "../../utils/utils";
import ShoppingListItemsGrouped from "./ShoppingListItemsGrouped";

type FilterShoppingListProps = {
  items: ShoppingListItem[];
  filters: ShoppingListFilter;
  handleCheckItems: (items: ShoppingListItem[]) => void;
};

const FilterShoppingList: FC<FilterShoppingListProps> = ({
  items,
  filters,
  handleCheckItems,
}) => {
  const order = filters.stores.find(
    (store) => store.id === filters.selectedStore,
  )!;
  if (items.length !== 0) {
    return (
      <ul className="flex flex-col bg-2 rounded-md p-2 gap-1">
        {filters.group
          ? sortByChecked(
              sortBySubcategory(order, groupShoppingListItems(items)),
            ).map((group) => (
              <ShoppingListItemsGrouped
                key={group.name}
                filter={filters}
                group={group}
                handleCheckItems={handleCheckItems}
              />
            ))
          : sortByChecked(sortBySubcategory(order, items)).map((item) => (
              <Item
                key={item.id}
                item={item}
                filter={filters}
                handleCheckItems={handleCheckItems}
              />
            ))}
      </ul>
    );
  }
};

export default FilterShoppingList;
