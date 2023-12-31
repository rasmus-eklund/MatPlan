import {
  CategoryItem,
  Day,
  Home,
  IngredientCat,
  MenuItem,
  OptimisticMethod,
  OptimisticType,
  ShoppingListItem,
  ShoppingListItemsGrouped,
  StoreOrder,
} from "@/types";

export const capitalize = (s: string) => {
  return s[0].toUpperCase() + s.slice(1);
};

export const groupSubcategoryByCategory = (
  items: StoreOrder,
): CategoryItem[] => {
  const start: CategoryItem[] = [];
  return items.order.reduce((acc, inputItem) => {
    const foundIndex = acc.findIndex(
      (item) => item.id === inputItem.category.id,
    );
    if (foundIndex === -1) {
      acc.push({
        ...inputItem.category,
        subcategories: [{ ...inputItem.subcategory }],
      });
    } else {
      acc[foundIndex].subcategories.push({
        ...inputItem.subcategory,
      });
    }
    return acc;
  }, start);
};

export const sortBySubcategory = <
  T extends { name: string; subcategoryId: number },
>(
  store: StoreOrder,
  items: T[],
): T[] => {
  const sortedIngredients = items.sort((a, b) => {
    return (
      store.order.map((i) => i.subcategory.id).indexOf(a.subcategoryId) -
      store.order.map((i) => i.subcategory.id).indexOf(b.subcategoryId)
    );
  });
  return sortedIngredients;
};

export const sortByChecked = <T extends { checked: boolean }>(items: T[]) =>
  items.sort((a, b) => {
    if (a.checked === b.checked) return 0;
    if (a.checked) return 1;
    return -1;
  });

export const groupShoppingListItems = (
  items: ShoppingListItem[],
): ShoppingListItemsGrouped[] => {
  const start: ShoppingListItemsGrouped[] = [];
  const groupedItems = items.reduce((acc, item) => {
    const group = acc.find((groupItem) => groupItem.name === item.name);
    if (group) {
      group.group.push(item);
    } else {
      const newGroup: ShoppingListItemsGrouped = {
        name: item.name,
        group: [item],
        checked: false,
        subcategoryId: item.subcategoryId,
      };
      acc.push(newGroup);
    }
    return acc;
  }, start);
  return groupedItems.map((group) => ({
    ...group,
    checked: group.group.every((i) => i.checked),
  }));
};

export const groupByUnit = (items: ShoppingListItem[]) => {
  const start: { quantity: number; unit: string }[] = [];
  return items.reduce((acc, item) => {
    const index = acc.findIndex((i) => i.unit === item.unit);
    if (index !== -1) {
      acc[index].quantity += item.quantity;
    } else {
      acc.push({ quantity: item.quantity, unit: item.unit });
    }
    return acc;
  }, start);
};

export const isHome = (name: string, items: Home[]) => {
  const home = Boolean(items.some((n) => n.id === name));
  if (home) {
  }
  return home;
};

export const SortMenuItems = (items: MenuItem[], day: Day) => {
  return items
    .filter((r) => r.day === day)
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
};

export const Optimistic = <T extends { id: string }>({
  setOpt,
  setItems,
}: OptimisticType<T>) => {
  const add = async ({ item, cb }: OptimisticMethod<T>) => {
    setOpt((prev) => [...prev, item]);
    const updatedItem = await cb(item);
    setItems((prev: T[]) => [...prev, updatedItem]);
  };
  const remove = async ({ item, cb }: OptimisticMethod<T>) => {
    setOpt((prev) => prev.filter((i) => i.id !== item.id));
    const removedItem = await cb(item);
    setItems((prev: T[]) => prev.filter((i) => i.id !== removedItem.id));
  };
  const update = async ({ item, cb }: OptimisticMethod<T>) => {
    setOpt((prev) => {
      const oldItems = prev.filter((i) => i.id !== item.id);
      return [...oldItems, item];
    });
    const updatedItem = await cb(item);
    setItems((prev: T[]) => {
      const oldItems = prev.filter((i) => i.id !== item.id);
      return [...oldItems, updatedItem];
    });
  };
  return { add, remove, update };
};

export const toShopListItem = ({
  name,
  subcategoryId,
}: IngredientCat): ShoppingListItem => {
  return {
    name,
    subcategoryId,
    quantity: 1,
    unit: "st",
    checked: false,
    id: crypto.randomUUID(),
  };
};
