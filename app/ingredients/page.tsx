'use client';

import React, { useEffect, useState } from 'react';
import SearchIngredients from '../components/SearchIngredient';
import {
  getExtraIngredients,
  createExtraIngredient,
} from '../db/extraIngredients';
import { Ingredient, IngredientId } from '@/types';
import EditIngredient from '../components/EditIngredient';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<IngredientId[]>([]);
  useEffect(() => {
    getExtraIngredients().then(ings => setIngredients(ings));
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
    const ings = await getExtraIngredients();
    await setIngredients(ings);
  };

  return (
    <main className="flex flex-col gap-5">
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
