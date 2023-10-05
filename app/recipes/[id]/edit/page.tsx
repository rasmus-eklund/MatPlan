'use client';
import { getContained, getRecipeById, updateRecipe } from '@/app/db/recipes';
import { Recipe, RecipeFront, RecipeSearch } from '@/types';
import RecipeForm from '../../RecipeForm';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const EditRecipePage = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [recipes, setRecipes] = useState<RecipeSearch[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    getRecipeById(params.id).then(res => setRecipe(res));
    getContained(params.id).then(res => setRecipes(res));
  }, [params.id]);

  const handleUpdate = (recipe: RecipeFront, recipes: RecipeSearch[]) => {
    updateRecipe(
      recipe,
      recipes.map(i => i.id),
      params.id
    ).then(() => {
      push(`/recipes/${params.id}`);
    });
  };

  const handleClose = () => {
    push(`/recipes/${params.id}`);
  };

  return (
    <main className="bg-2 min-h-screen p-5">
      <section className="flex flex-col gap-5 bg-3 p-8 lg: max-w-screen-sm">
        {recipe && (
          <RecipeForm
            recipe={recipe}
            recipes={recipes}
            update={handleUpdate}
            closeForm={handleClose}
          />
        )}
      </section>
    </main>
  );
};

export default EditRecipePage;
