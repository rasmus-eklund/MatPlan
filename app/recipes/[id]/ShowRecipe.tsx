import DaysDropDown from '@/app/components/DaysDropDown';
import { FullRecipe } from '@/types';
import React from 'react';

type Props = {
  recipe: FullRecipe;
};

const ShowRecipe = ({ recipe }: Props) => {
  return (
    <section>
      <h3>{recipe.name}</h3>
      <p>{recipe.portions}</p>
      <ul>
        {recipe.recipe_ingredient.map(
          ({ id, ingredientName: name, quantity, unit }) => (
            <li key={id}>
              <p>{name}</p>
              <p>{quantity}</p>
              <p>{unit}</p>
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
    </section>
  );
};

export default ShowRecipe;
