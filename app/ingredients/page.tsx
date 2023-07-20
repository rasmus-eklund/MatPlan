'use client';

import React, { useEffect, useState } from 'react';
import SearchIngredients from '../components/SearchIngredient';
import { getExtraIngredients, upsertIngredient } from '../db/prisma';
import { ExtraIngredient } from '@/types';
import Ingredient from './Ingredient';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<ExtraIngredient[]>();
  useEffect(() => {
    getExtraIngredients().then(ings => setIngredients(ings));
  }, []);
  const addIngredient = async (name: string) => {
    const ingredient: ExtraIngredient = {
      name,
      quantity: 1,
      unit: 'st',
      userId: 'Rasmus',
    };
    await upsertIngredient(ingredient);
    await getExtraIngredients().then(ings => setIngredients(ings));
  };

  return (
    <>
      <SearchIngredients callback={addIngredient} />
      <ul>
        {ingredients?.map(i => (
          <Ingredient ingredient={i} key={i.name + '_extra'} />
        ))}
      </ul>
    </>
  );
};

export default Ingredients;
