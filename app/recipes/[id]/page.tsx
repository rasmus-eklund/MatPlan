'use client';
import {
  deleteRecipe,
  getContained,
  getRecipeById,
  updateRecipe,
} from '@/app/db/recipes';
import { Day, RecipeFront, RecipeSearch } from '@/types';
import React, { useEffect, useState } from 'react';

import DaysDropDown from '@/app/components/DaysDropDown';
import { useRouter } from 'next/navigation';
import ShowRecipe from '@/app/components/ShowRecipe';
import RecipeForm from '@/app/components/recipes/RecipeForm';
import { addRecipeToMenu } from '@/app/db/menu';
import Button from '@/app/components/buttons/Button';
import Loading from '@/app/components/Loading';

const Recipe = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<RecipeFront>();
  const [recipes, setRecipes] = useState<RecipeSearch[]>([]);
  const [hideForm, setHideForm] = useState(true);
  const { push } = useRouter();
  const id = params.id;

  useEffect(() => {
    getRecipeById(id).then(res => setRecipe(res));
    getContained(id).then(res => setRecipes(res));
  }, [id]);

  const handleDeleteRecipe = () => {
    deleteRecipe(id).then(() => {
      push('/recipes');
    });
  };

  const handleUpdate = (recipe: RecipeFront, recipes: RecipeSearch[]) => {
    updateRecipe(recipe, recipes, params.id).then(() => {
      setHideForm(true);
      setRecipe(recipe);
    });
  };

  const handleAddToMenu = (day: Day, id: string, portions: number) => {
    addRecipeToMenu({ day, id, portions });
  };

  return (
    <main className="bg-2 p-5 grow overflow-y-auto">
      {recipe ? (
        <section className="flex flex-col gap-5 bg-3 p-8 lg: max-w-screen-sm">
          {hideForm ? (
            <>
              <ShowRecipe
                recipe={recipe}
                id={params.id}
                scale={recipe.portions}
              />
              <div className="flex gap-2 justify-between">
                <button className="text-"></button>
                <DaysDropDown
                  initDay="Obestämd"
                  callback={day =>
                    handleAddToMenu(day, params.id, recipe.portions)
                  }
                />
                <div className="flex gap-4 items-center py-2">
                  <Button name="Ändra" callback={() => setHideForm(false)} />
                  <Button name="Ta bort" callback={handleDeleteRecipe} />
                </div>
              </div>
            </>
          ) : (
            <RecipeForm
              recipe={recipe}
              recipes={recipes}
              update={handleUpdate}
              closeForm={() => setHideForm(true)}
            />
          )}
        </section>
      ) : (
        <Loading />
      )}
    </main>
  );
};

export default Recipe;
