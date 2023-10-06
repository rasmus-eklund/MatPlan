import { ShoppingListLocalStorage, ShoppingListItem } from '@/types';

export const groupItems = (
  items: ShoppingListItem[],
  data: ShoppingListLocalStorage[]
): ShoppingListItem[] => {
  const groupedItems = items.reduce((acc: ShoppingListItem[], cur) => {
    // const lsItem = data.find(i => i.id === cur.id);
    // const isChecked = cur.id && lsItem!.id && lsItem!.checked;
    const match = acc.findIndex(
      (i: ShoppingListItem) =>
        i.name === cur.name && i.unit === cur.unit
    );
    const item: ShoppingListItem = { ...cur };
    if (match === -1) {
      acc.push(item);
    } else {
      acc[match].quantity += item.quantity;
    }
    return acc;
  }, []);
  return groupedItems;
};

const nameLS = 'shoppingList_checked';

export const updateCheckedData = (items: ShoppingListItem[]) => {
  const raw = localStorage.getItem(nameLS);
  let data: ShoppingListLocalStorage[];
  if (raw === null) {
    data = createChecked(items);
  } else {
    data = JSON.parse(raw);
  }
  data = data.filter(d => items.some(item => item.id === d.id));
  items.forEach(i => {
    if (!data.some(d => d.id === i.id)) {
      data.push({ id: i.id, name: i.name, checked: false });
    }
  });
  localStorage.setItem(nameLS, JSON.stringify(data));
  return data;
};

export const updateCheckedItem = (item: ShoppingListItem, checked: boolean) => {
  const data: ShoppingListLocalStorage[] = JSON.parse(
    localStorage.getItem(nameLS)!
  );
  const indexToUpdate = data.findIndex(i => i.id === item.id);
  if (indexToUpdate !== -1) {
    data[indexToUpdate].checked = checked;
  } else {
    throw new Error('Item not found in localStorage');
  }
  localStorage.setItem(nameLS, JSON.stringify(data));
};

const createChecked = (
  items: ShoppingListItem[]
): ShoppingListLocalStorage[] => {
  const data = items.map(i => ({ id: i.id!, name: i.name, checked: false }));
  localStorage.setItem(nameLS, JSON.stringify(data));
  return data;
};
