import DaysDropDown from '@/app/components/DaysDropDown';
import { FullRecipe } from '@/types';
import React from 'react';

type Props = {
  recipe: FullRecipe;
};

const ShowRecipe = ({ recipe }: Props) => {
  return (
    <section className='w-full flex justify-center bg-2 p-4'>
<div className='bg-3 w-2/3 p-4 rounded-md'>
      <h3 className='text-1 font-bold text-xl'>{recipe.name}</h3>
<div className='flex justify-start'>
  <h1 className='text-2xl'>Portioner:</h1>
  <p className='ml-8 bg-4 py-0.5 px-6 rounded-lg'>{recipe.portions}</p>
</div>
<h1 className='text-2xl'>Ingredienser</h1>
      <ul>
        {recipe.recipe_ingredient.map(
          ({ id, ingredientName: name, quantity, unit }) => (
            <li key={id}>
              <div className='justify-between flex'>
              <p>{name}</p>
              <p>{quantity} {unit}</p>
              </div>
            </li>
          )
        )}
      </ul>
      <p>{recipe.instruction}</p>
      <label
        htmlFor="filter"
        className="border-2 p-1.5 px-4 rounded-md border-black m-4"
      >
        Day
      </label>
      <DaysDropDown id={recipe.id} portions={recipe.portions} />
      </div>
    </section>
  );
};

export default ShowRecipe;
