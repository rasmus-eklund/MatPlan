'use client';

import React, { useEffect, useState } from 'react';
import SearchIngredients from '../components/SearchIngredient';
import {
  getExtraIngredients,
  createExtraIngredient,
  deleteExraIngredient,
  updateExtraIngredient,
} from '../db/extraIngredients';
import { Home, Ingredient, IngredientId } from '@/types';
import EditIngredient from '../components/EditIngredient';
import { getRecipeIngredients } from '../db/prisma';
import { getHome, addHome, removeHome } from '../db/home';
import NoEditItem from './NoEditItem';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<IngredientId[]>([]);
  const [extraIngredients, setExtraIngredients] = useState<IngredientId[]>([]);
  const [homeState, setHomeState] = useState<Home[]>([]);

  useEffect(() => {
    update();
    (async () => setHomeState(await getHome()))();
  }, []);

  const isHome = (name: string) => {
    return Boolean(homeState.find(n => n.ingredientName === name));
  };

  const addIngredient = async (name: string) => {
    const ingredient: Ingredient = {
      name,
      quantity: 1,
      unit: 'st',
    };
    await createExtraIngredient(ingredient);
    await update();
  };

  const update = async () => {
    const [extra, ings] = await Promise.all([
      getExtraIngredients(),
      getRecipeIngredients(),
    ]);
    setIngredients(ings);
    setExtraIngredients(extra);
  };

  const handleSave = async (id: string, ing: Ingredient) => {
    await updateExtraIngredient(id, ing);
  };
  const handleDelete = async (id: string) => {
    await deleteExraIngredient(id);
    await update();
  };

  return (
    <main className="flex flex-col">
      <SearchIngredients callback={addIngredient} />
      <ul>
        {extraIngredients.map(i => (
          <EditIngredient
            remove={() => handleDelete(i.id)}
            save={ing => handleSave(i.id, ing)}
            ingredient={i}
            key={i.id}
          />
        ))}
      </ul>
      <ul className="flex flex-col gap-5 p-5">
        {ingredients.map(ing => (
          <NoEditItem
            key={ing.id}
            ing={ing}
            home={isHome(ing.name)}
            showHome={true}
          />
        ))}
      </ul>
    </main>
  );
};

export default Ingredients;
