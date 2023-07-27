import DaysDropDown from '@/app/components/DaysDropDown';
import { FullRecipe } from '@/types';
import React from 'react';

type Props = {
  recipe: FullRecipe;
};

const ShowRecipe = ({ recipe }: Props) => {
  return (
    <section className="flex flex-col bg-3 p-5 rounded-md gap-5">
      <h1 className="text-1 bg-3 text-3xl min-w-full font-bold">
        {recipe.name}
      </h1>
      <div className="flex justify-end h-6 items-center">
        <DaysDropDown id={recipe.id} portions={recipe.portions} />
      </div>
      <div className="rounded-md bg-2 p-4 flex flex-col gap-2">
        <div className="flex">
          <h2 className="text-4 text-lg w-1/4">Portioner:</h2>
          <p className="rounded-md w-10 text-center text-1 bg-3">
            {recipe.portions}
          </p>
        </div>
        <div className="flex bg-2">
          <h2 className="text-4 text-lg w-1/4">Ingredienser</h2>
          <ul className="bg-3 p-2 rounded-md w-3/4 flex flex-col gap-1.5 py-2">
            {recipe.recipe_ingredient.map(
              ({ id, ingredientName: name, quantity, unit }) => (
                <li className="bg-4 px-4 rounded-md" key={id}>
                  <div className="justify-between flex text-2 ">
                    <p>{name}</p>
                    <p>
                      {quantity} {unit}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
        <div className="flex">
          <h2 className="text-4 text-lg w-1/4">Instruktion</h2>
          <p className="bg-3 text-1 w-3/4 rounded-md p-2">
            {recipe.instruction}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShowRecipe;
