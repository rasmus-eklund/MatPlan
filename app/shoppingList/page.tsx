'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IngredientCat, ShoppingListItem } from '@/types';
import {
  getIngredientCategories,
  getShoppingList,
  updateItem,
} from '../db/items';
import { getAllStores } from '../db/stores';
import SelectStore from '../components/FilterShoppingList';
import Loading from '../components/Loading';
import FilterShoppingList from '../components/FilterShoppingList';

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [stores, setStores] = useState<{ name: string; id: string }[]>();
  const categories = useRef<IngredientCat[]>();

  useEffect(() => {
    Promise.all([
      getAllStores(),
      getShoppingList(),
      getIngredientCategories(),
    ]).then(([allStores, shoppingList, ingredientCategories]) => {
      setStores(allStores);
      setItems(shoppingList);
      categories.current = ingredientCategories;
    });
  }, []);

  const handleCheck = (item: Omit<ShoppingListItem, 'name' | 'from'>) => {
    updateItem({
      id: item.id,
      checked: item.checked,
      quantity: item.quantity,
      unit: item.unit,
    });
    const newItem = items.find(i => i.id === item.id)!;
    newItem.checked = item.checked;
    setItems([...items.filter(i => i.id !== item.id), newItem]);
  };
  return (
    <main className="bg-2 p-5 grow overflow-y-auto">
      {stores && categories.current ? (
        <FilterShoppingList
          stores={stores}
          items={items}
          categories={categories.current}
          onCheck={handleCheck}
        />
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default ShoppingList;
