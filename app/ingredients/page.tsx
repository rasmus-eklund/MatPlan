'use client';

import React, { useEffect, useState } from 'react';
import SearchIngredients from '../components/SearchIngredient';
import { getExtraIngredients, upsertExtraIngredient } from '../db/prisma';
import { addIngredient } from '@/types';
import Ingredient from './Ingredient';
import EditIngredient from '../components/EditIngredient';

const Ingredients = () => {
  const [ingredients, setIngredients] = useState<addIngredient[]>([]);
  useEffect(() => {
    getExtraIngredients().then(ings => setIngredients(ings));
  }, []);
  const addIngredient = async (name: string) => {
    const ingredient: addIngredient = {
      name,
      quantity: 1,
      unit: 'st',
    };
    await upsertExtraIngredient(ingredient);
    await getExtraIngredients().then(ings => setIngredients(ings));
  };

  return (
    <>
      <SearchIngredients callback={addIngredient} />
      <ul>
        {ingredients.map(i => (
          // <Ingredient ingredient={i} key={i.name + '_extra'} />
          <EditIngredient ingredient={i} key={i.name + '_extra'} />
        ))}
      </ul>
    </>
  );
};

export default Ingredients;
