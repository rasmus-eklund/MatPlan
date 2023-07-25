'use client';
import React, { useEffect, useState } from 'react';
import * as stores from '../db/stores';
import { ShoppingListType, StorePrisma } from '@/types';
import SelectStore from '../components/SelectStore';
import { getShoppingList } from '../db/prisma';
import { getExtraIngredients } from '../db/extraIngredients';

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<ShoppingListType[]>([]);
  const [sortedIngredients, setSortedIngredients] = useState<
    ShoppingListType[]
  >([]);
  const [storesState, setStoresState] = useState<StorePrisma[]>([]);
  const [store, setStore] = useState<StorePrisma>();
  const [filter, setFilter] = useState({ group: true });

  useEffect(() => {
    stores
      .getAll()
      .then(s => {
        setStore(s[0]);
        setStoresState(s);
      })
      .then(() => Promise.all([getShoppingList(), getExtraIngredients()]))
      .then(([a, b]) => setIngredients([...a, ...b]));
  }, []);

  useEffect(() => {
    if (store) {
      const sortedIngredients = ingredients.sort(
        (a, b) =>
          store.order.indexOf(a.subCategory) -
          store.order.indexOf(b.subCategory)
      );
      setSortedIngredients(sortedIngredients);
    }
  }, [store, ingredients]);

  const handleSelectStore = async (id: string) => {
    const selected = await stores.get(id);
    setStore({
      ...selected,
      order: selected.categories.flatMap(c => c.order.map(i => i.id)),
    });
  };

  return (
    <>
      <SelectStore
        stores={storesState}
        callback={id => handleSelectStore(id)}
      />
      <ul>
        {sortedIngredients.map(i => (
          <li key={crypto.randomUUID()} className="grid grid-cols-3">
            <p>{i.name}</p>
            <p>{`${i.quantity} ${i.unit}`}</p>
            <p>{i.from}</p>
          </li>
        ))}
      </ul>
    </>
  );
};

export default ShoppingList;
