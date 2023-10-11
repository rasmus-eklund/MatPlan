'use client';
import React, { useEffect, useRef, useState } from 'react';
import { IngredientCat, ShoppingListItem } from '@/types';
import {
  getIngredientCategories,
  getShoppingList,
  updateItem,
} from '../db/items';
import { getAllStores } from '../db/stores';
import Loading from '../components/Loading';
import FilterShoppingList from '../components/shoppingList/FilterShoppingList';

const ShoppingList = () => {
  const [items, setItems] = useState<ShoppingListItem[]>([]);
  const [selectedStore, setSelectedStore] =
    useState<{ name: string; id: string }[]>();
  const categories = useRef<IngredientCat[]>();

  useEffect(() => {
    Promise.all([
      getAllStores(),
      getShoppingList(),
      getIngredientCategories(),
    ]).then(([allStores, shoppingList, ingredientCategories]) => {
      setSelectedStore(allStores);
      setItems(shoppingList);
      categories.current = ingredientCategories;
    });
  }, []);

  const handleCheck = (updatedItems: ShoppingListItem[]) => {
    const newItems = [
      ...items.filter(i => !updatedItems.some(item => item.id === i.id)),
      ...updatedItems,
    ];
    setItems(newItems);
    Promise.all(
      updatedItems.map(item =>
        updateItem({
          id: item.id,
          checked: item.checked,
          quantity: item.quantity,
          unit: item.unit,
        })
      )
    );
  };
  return (
    <main className="bg-2 p-5 grow overflow-y-auto">
      {selectedStore && categories.current ? (
        <FilterShoppingList
          stores={selectedStore}
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
