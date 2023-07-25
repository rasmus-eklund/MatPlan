'use client';
import React, { useEffect, useState } from 'react';
import * as stores from '../db/stores';
import { ShoppingListType, StorePrisma } from '@/types';
import SelectStore from '../components/SelectStore';
import { getShoppingList } from '../db/prisma';
import { getExtraIngredients } from '../db/extraIngredients';
import Item from './Item';
import { groupItems } from './groupItems';

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<ShoppingListType[]>([]);
  const [sortedIngredients, setSortedIngredients] = useState<
    ShoppingListType[]
  >([]);
  const [storesState, setStoresState] = useState<StorePrisma[]>([]);
  const [store, setStore] = useState<StorePrisma>();
  const [group, setGroup] = useState(false);
  const [recipe, setRecipe] = useState(false);

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
      let sortedIngredients = ingredients.sort(
        (a, b) =>
          store.order.indexOf(a.subCategory) -
          store.order.indexOf(b.subCategory)
      );
      if (group) {
        sortedIngredients = groupItems(sortedIngredients);
      }
      if (recipe) {
        sortedIngredients = sortedIngredients.map(i => ({ ...i, from: '' }));
      }
      setSortedIngredients(sortedIngredients);
    }
  }, [store, ingredients, group, recipe]);

  const handleSelectStore = async (id: string) => {
    const selected = await stores.get(id);
    setStore({
      ...selected,
      order: selected.categories.flatMap(c => c.order.map(i => i.id)),
    });
  };

  return (
    <main>
      <SelectStore
        stores={storesState}
        callback={id => handleSelectStore(id)}
      />
      <label htmlFor="group_check">Gruppera</label>
      <input
        onChange={() => setGroup(!group)}
        checked={group}
        type="checkbox"
        name="group_check"
        id="group_check"
      />
      <label htmlFor="recipe_check">Recept</label>
      <input
        onChange={() => setRecipe(!recipe)}
        checked={recipe}
        type="checkbox"
        name="recipe_check"
        id="recipe_check"
      />
      <ul className='flex flex-col'>
        {sortedIngredients.map(i => (
          <Item key={crypto.randomUUID()} item={i} />
        ))}
      </ul>
    </main>
  );
};

export default ShoppingList;
