'use client';
import { Recipe } from '@/types';
import { FC, useEffect, useState } from 'react';
import { getContained } from '../db/recipes';
import Link from 'next/link';
import { capitalize } from '../utils/utils';

type ShowRecipeProps = {
  recipe: Recipe;
  scale: number;
};

const ShowRecipe: FC<ShowRecipeProps> = ({ recipe, scale }) => {
  const [recipes, setRecipes] = useState<{ name: string; id: string }[]>([]);

  useEffect(() => {
    getContained(recipe.id).then(res => {
      setRecipes(res);
    });
  }, [recipe.id]);

  return (
    <section className="flex flex-col bg-3 rounded-md gap-5">
      <h1 className="text-1 bg-3 text-3xl font-bold">{recipe.name}</h1>
      <div className="rounded-md bg-2 p-2 flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="text-4 text-lg">Portioner:</h2>
          <p className="rounded-md w-10 text-center text-1 bg-3">{scale}</p>
        </div>
        <div className="flex flex-col bg-2 gap-1">
          <h2 className="text-4 text-lg">Ingredienser</h2>
          <ul className="bg-3 p-1 rounded-md flex flex-col gap-1">
            {recipe.ingredients.map(({ id, name, quantity, unit }) => (
              <li className="bg-4 p-1 rounded-md" key={id}>
                <div className="flex justify-between text-2">
                  <p>{capitalize(name)}</p>
                  <p>
                    {(scale / recipe.portions) * quantity} {unit}
                  </p>
                </div>
              </li>
            ))}
          </ul>
          {recipes.length !== 0 && (
            <>
              <h2 className="text-4 text-lg">Recept</h2>
              <ul className="bg-3 p-1 rounded-md flex flex-col gap-1">
                {recipes.map(rec => (
                  <li className="bg-4 p-1 rounded-md" key={rec.id}>
                    <div className="flex justify-between text-2">
                      <Link className="text-lg" href={`/recipes/${rec.id}`}>
                        {rec.name}
                      </Link>
                      <p className="text-1">FIX Portioner</p>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
        <div className="flex flex-col">
          <h2 className="text-4 text-lg">Instruktion</h2>
          <p className="bg-3 text-1 rounded-md p-2 whitespace-pre-wrap">
            {recipe.instruction}
          </p>
        </div>
      </div>
    </section>
  );
};

export default ShowRecipe;
