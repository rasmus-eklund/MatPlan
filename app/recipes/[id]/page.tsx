'use client';
import { deleteRecipe, getRecipeById, updateRecipe } from '@/app/db/recipes';
import { Day, Recipe } from '@/types';
import { useEffect, useState } from 'react';

import DaysDropDown from '@/app/components/DaysDropDown';
import { useRouter } from 'next/navigation';
import ShowRecipe from '@/app/components/ShowRecipe';
import RecipeForm from '@/app/components/recipes/RecipeForm';
import { addRecipeToMenu } from '@/app/db/menu';
import Button from '@/app/components/buttons/Button';
import Loading from '@/app/components/Loading';

const Recipe = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [hideForm, setHideForm] = useState(true);
  const { push } = useRouter();
  const id = params.id;

  useEffect(() => {
    getRecipeById(id).then(res => setRecipe(res));
  }, [id]);

  const handleDeleteRecipe = () => {
    deleteRecipe(id).then(() => {
      push('/recipes');
    });
  };

  const handleUpdate = (recipe: Recipe) => {
    updateRecipe(recipe).then(() => {
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
        <section className="flex flex-col rounded-md gap-5 bg-3 p-8 lg: max-w-screen-sm">
          {hideForm ? (
            <ShowRecipe recipe={recipe}>
              <DaysDropDown
                initDay="Obestämd"
                setDay={day => handleAddToMenu(day, params.id, recipe.portions)}
              />
              <div className="flex gap-4 items-center py-2">
                <Button name="Ändra" callback={() => setHideForm(false)} />
                <Button name="Ta bort" callback={handleDeleteRecipe} />
              </div>
            </ShowRecipe>
          ) : (
            <RecipeForm
              recipe={recipe}
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
