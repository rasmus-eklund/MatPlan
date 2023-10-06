'use client';
import {
  deleteRecipe,
  getContained,
  getRecipeById,
  updateRecipe,
} from '@/app/db/recipes';
import { Day, Recipe, RecipeFront, RecipeSearch } from '@/types';
import React, { useEffect, useState } from 'react';

import EditButton from '@/app/components/buttons/Edit';
import DaysDropDown from '@/app/components/DaysDropDown';
import DeleteButton from '@/app/components/buttons/Delete';
import { useRouter } from 'next/navigation';
import ShowRecipe from '@/app/components/ShowRecipe';
import RecipeForm from '@/app/components/RecipeForm';
import { addRecipeToMenu } from '@/app/db/menu';

const Recipe = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<Recipe>();
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
    });
  };

  const handleAddToMenu = (day: Day, id: string, portions: number) => {
    addRecipeToMenu({ day, id, portions });
  };

  return (
    <main className="bg-2 min-h-screen p-5">
      {recipe && (
        <section className="flex flex-col gap-5 bg-3 p-8 lg: max-w-screen-sm">
          {hideForm ? (
            <>
              <ShowRecipe recipe={recipe} scale={recipe.portions} />
              <div className="flex gap-2 justify-between">
                <DaysDropDown
                  initDay="Obestämd"
                  callback={day =>
                    handleAddToMenu(day, recipe.id, recipe.portions)
                  }
                />
                <div className="flex gap-4 items-center py-2">
                  <EditButton callback={() => setHideForm(false)} />
                  <DeleteButton callback={handleDeleteRecipe} />
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
      )}
    </main>
  );
};

export default Recipe;
