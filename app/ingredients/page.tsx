'use client';

import React, { useEffect, useState } from 'react';
import SearchIngredients from '../components/SearchIngredient';
import {
  getExtraIngredients,
  createExtraIngredient,
} from '../db/extraIngredients';
import { Ingredient, IngredientId } from '@/types';
import EditIngredient from '../components/EditIngredient';
import { getRecipeIngredients } from '../db/prisma';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<IngredientId[]>([]);
  useEffect(() => {
    update();
  }, []);
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
    await setIngredients([...ings, ...extra]);
  };

  return (
    <main className="flex flex-col">
      <SearchIngredients callback={addIngredient} />
      <ul className="flex flex-col gap-5 p-5">
        {ingredients.map(i => (
          <EditIngredient callback={update} ingredient={i} key={i.id} />
        ))}
      </ul>
    </main>
  );
};

export default Ingredients;
