'use client';

import React, { useEffect, useState } from 'react';
import SearchIngredients from '../components/SearchIngredient';
import { getExtraIngredients, upsertExtraIngredient } from '../db/prisma';
import { addIngredient } from '@/types';
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
    await update();
  };
  const update = async () => {
    const ings = await getExtraIngredients();
    await setIngredients(ings);
  };

  return (
    <>
      <SearchIngredients callback={addIngredient} />
      <ul className='flex flex-col gap-5'>
        {ingredients.map(i => (
          <EditIngredient
            callback={update}
            ingredient={i}
            key={i.name + '_extra'}
          />
        ))}
      </ul>
    </>
  );
};

export default Ingredients;
