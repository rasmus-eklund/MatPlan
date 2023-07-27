'use client';
import React, { useEffect, useState } from 'react';
import * as stores from '../db/stores';
import {
  ShoppingListLocalStorage,
  ShoppingListType,
  StorePrisma,
} from '@/types';
import SelectStore from '../components/SelectStore';
import { getRecipeIngredients } from '../db/prisma';
import { getExtraIngredients } from '../db/extraIngredients';
import Item from './Item';
import { groupItems, updateCheckedData } from './groupItems';

const ShoppingList = () => {
  const [ingredients, setIngredients] = useState<ShoppingListType[]>([]);
  const [sortedIngredients, setSortedIngredients] = useState<
    ShoppingListType[]
  >([]);
  const [storesState, setStoresState] = useState<StorePrisma[]>([]);
  const [store, setStore] = useState<StorePrisma>();
  const [group, setGroup] = useState(false);
  const [recipe, setRecipe] = useState(false);
  const [data, setData] = useState<ShoppingListLocalStorage[]>([]);

  useEffect(() => {
    const update = async () => {
      const theStore = await stores.getAll();
      setStore(theStore[0]);
      setStoresState(theStore);
      const [ings, extra] = await Promise.all([
        getRecipeIngredients(),
        getExtraIngredients(),
      ]);
      const allIngs = [...ings, ...extra];
      setIngredients(allIngs);
      const data = updateCheckedData(allIngs);
      setData(data);
    };
    update();
  }, []);

  useEffect(() => {
    if (store) {
      let sortedIngredients = ingredients.sort(
        (a, b) =>
          store.order.indexOf(a.subCategory) -
          store.order.indexOf(b.subCategory)
      );
      if (group) {
        sortedIngredients = groupItems(sortedIngredients, data);
      }
      if (recipe) {
        sortedIngredients = sortedIngredients.map(i => ({ ...i, from: '' }));
      }
      setSortedIngredients(sortedIngredients);
    }
  }, [store, ingredients, group, recipe, data]);

  const handleSelectStore = async (id: string) => {
    const selected = await stores.get(id);
    setStore({
      ...selected,
      order: selected.categories.flatMap(c => c.order.map(i => i.id)),
    });
  };

  return (
    <main className="bg-2 p-5 h-screen">
      <div className="bg-3 rounded-md p-3 flex flex-col gap-2">
        <div className="flex justify-between">
          <SelectStore
            stores={storesState}
            callback={id => handleSelectStore(id)}
          />
          <div className="flex flex-col">
            <div className="flex gap-2">
              <input
                onChange={() => setGroup(!group)}
                checked={group}
                type="checkbox"
                name="group_check"
                id="group_check"
              />
              <label htmlFor="group_check">Gruppera ingredienser</label>
            </div>
            <div className='flex gap-2'>
              <input
                onChange={() => setRecipe(!recipe)}
                checked={recipe}
                type="checkbox"
                name="recipe_check"
                id="recipe_check"
              />
              <label htmlFor="recipe_check">Dölj tillhörighet</label>
            </div>
          </div>
        </div>
        <ul className="flex flex-col bg-2 rounded-md p-2 gap-1">
          {sortedIngredients.map(i => (
            <Item
              key={crypto.randomUUID()}
              item={i}
              checked={data.find(d => d.id === i.id)!.checked}
            />
          ))}
        </ul>
      </div>
    </main>
  );
};

export default ShoppingList;
