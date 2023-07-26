'use client';

import React, { useEffect, useState } from 'react';
import SearchIngredients from '../components/SearchIngredient';
import {
  getExtraIngredients,
  createExtraIngredient,
  deleteExraIngredient,
  updateExtraIngredient,
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
      <ul className="flex flex-col gap-5 p-5">
        {ingredients.map(i => (
          <EditIngredient
            remove={() => handleDelete(i.id)}
            save={ing => handleSave(i.id, ing)}
            ingredient={i}
            key={i.id}
          />
        ))}
      </ul>
    </main>
  );
};

export default Ingredients;
