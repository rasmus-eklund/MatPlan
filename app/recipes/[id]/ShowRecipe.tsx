import DaysDropDown from '@/app/components/DaysDropDown';
import { FullRecipe } from '@/types';
import React from 'react';

type Props = {
  recipe: FullRecipe;
};

const ShowRecipe = ({ recipe }: Props) => {
  return (
    <section className="w-full flex justify-center bg-2 p-4">
      <div className="bg-3 w-2/3 p-4 rounded-md">
      <h1 className="text-1 font-bold text-3xl py-4">{recipe.name}</h1>
        <div className='bg-2 p-2 rounded-md'>
    
        <div className="flex justify-between">
          <h1 className="text-2xl w-1/4 my-4 text-4">Portioner:</h1>
          <div className="w-3/4">
            <p className="bg-3 text-center text-2 font-bold rounded-lg w-10 my-4">
              {recipe.portions}
            </p>
          </div>
        </div>

        <div className="flex  justify-between">
          <h1 className="text-2xl text-4">Ingredienser</h1>
          <div className=" justify-end w-3/4">
            <ul className=" bg-3 py-2 rounded-lg text-2 ">
              {recipe.recipe_ingredient.map(
                ({ id, ingredientName: name, quantity, unit }) => (
                  <li className="bg-4 m-1.5 px-4 rounded-md" key={id}>
                    <div className="justify-between flex ">
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
        </div>
        <div className="flex justify-between">
          <div className="justify-end w-1/4 ">
            <h1 className="text-2xl text-4">Instruktion</h1>
         
          </div>
          <div className="w-3/4 rounded-md mt-2 text-2 bg-3">
              <p className=" w-3/4 rounded-md bg-3 text-2 px-4 mx-1.5">{recipe.instruction}</p>
            </div>
        </div>
        </div>
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
