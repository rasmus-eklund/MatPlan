'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IngredientCat, ShoppingListItem } from '@/types';
import { getIngredientCategories, getShoppingList } from '../db/items';
import { getAllStores } from '../db/stores';
import SelectStore from '../components/SelectStore';

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

  return (
    <main className="bg-2 p-5 grow overflow-y-auto">
      {stores && categories.current ? (
        <SelectStore
          stores={stores}
          items={items}
          categories={categories.current}
        />
      ) : (
        <p>Loading...</p>
      )}
    </main>
  );
};

export default ShoppingList;
