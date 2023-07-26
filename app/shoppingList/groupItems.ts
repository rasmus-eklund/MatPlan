import { ShoppingListType } from '@/types';

export const groupItems = (items: ShoppingListType[]): ShoppingListType[] =>
  items.reduce((acc: ShoppingListType[], cur) => {
    const match = acc.findIndex(
      (i: ShoppingListType) => i.name === cur.name && i.unit === cur.unit
    );
    const item: ShoppingListType = { ...cur };
    if (match === -1) {
      acc.push(item);
    } else {
      acc[match].quantity += item.quantity;
    }
    return acc;
  }, []);
