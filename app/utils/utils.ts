import {
  CategoryItem,
  Home,
  IngredientCat,
  ShoppingListItem,
  ShoppingListItemsGrouped,
  Store,
} from '@/types';


export const capitalize = (s: string) => {
  return s[0].toUpperCase() + s.slice(1);
};

export const groupSubcategoryByCategory = (items: Store): CategoryItem[] => {
  const start: CategoryItem[] = [];
  return items.order.reduce((acc, inputItem) => {
    const foundIndex = acc.findIndex(item => item.id === inputItem.category.id);
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

export const sortByName = <T extends { name: string }>(
  store: Store,
  items: T[],
  categories: IngredientCat[]
): T[] => {
  const sortedIngredients = items.sort((a, b) => {
    const aIndex = categories.find(i => i.name === a.name)!.subcategoryId;
    const bIndex = categories.find(i => i.name === b.name)!.subcategoryId;
    return (
      store.order.map(i => i.subcategory.id).indexOf(aIndex) -
      store.order.map(i => i.subcategory.id).indexOf(bIndex)
    );
  });
  return sortedIngredients;
};

export const sortByChecked = <T extends { checked: boolean }>(
  items: T[]
) =>
  items.sort((a, b) => {
    if (a.checked === b.checked) return 0;
    if (a.checked) return 1;
    return -1;
  });

export const groupShoppingListItems = (
  items: ShoppingListItem[]
): ShoppingListItemsGrouped[] => {
  const start: ShoppingListItemsGrouped[] = [];
  const groupedItems = items.reduce((acc, item) => {
    const group = acc.find(groupItem => groupItem.name === item.name);
    if (group) {
      group.group.push(item);
    } else {
      const newGroup = { name: item.name, group: [item], checked: false };
      acc.push(newGroup);
    }
    return acc;
  }, start);
  return groupedItems.map(group => ({
    ...group,
    checked: group.group.every(i => i.checked),
  }));
};

export const groupByUnit = (items: ShoppingListItem[]) => {
  const start: { quantity: number; unit: string }[] = [];
  return items.reduce((acc, item) => {
    const index = acc.findIndex(i => i.unit === item.unit);
    if (index !== -1) {
      acc[index].quantity += item.quantity;
    } else {
      acc.push({ quantity: item.quantity, unit: item.unit });
    }
    return acc;
  }, start);
};

export const isHome = (name: string, items: Home[]) => {
  const home = Boolean(items.some(n => n.name === name));
  if (home) {
  }
  return home;
};
