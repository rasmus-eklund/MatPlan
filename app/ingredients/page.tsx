'use client';

import React, { useEffect, useState } from 'react';
import SearchIngredients from '../components/SearchIngredient';
import { getExtraIngredients, upsertIngredient } from '../db/prisma';
import { ExtraIngredient } from '@/types';

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
  };

  return (
    <>
      <SearchIngredients callback={addIngredient} />
      <ul>
        {ingredients?.map(i => (
          <li key={i.name + '_extra'}>{i.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Ingredients;
