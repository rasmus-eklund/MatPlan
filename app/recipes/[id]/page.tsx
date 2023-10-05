'use client';
import { deleteRecipe, getRecipeById } from '@/app/db/recipes';
import { Recipe } from '@/types';
import React, { useEffect, useState } from 'react';
import ShowRecipe from '../ShowRecipe';
import EditButton from '@/app/components/buttons/Edit';
import DaysDropDown from '@/app/components/DaysDropDown';
import DeleteButton from '@/app/components/buttons/Delete';
import { useRouter } from 'next/navigation';

const Recipe = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const { push } = useRouter();

  useEffect(() => {
    getRecipeById(params.id).then(res => setRecipe(res));
  }, [params.id]);
  const handleDeleteRecipe = () => {
    deleteRecipe(params.id).then(() => {
      push('/recipes');
    });
  };

  return (
    <main className="bg-2 min-h-screen p-5">
      <section className="flex flex-col gap-5 bg-3 p-8 lg: max-w-screen-sm">
        {recipe && <ShowRecipe recipe={recipe} />}
        <div className="flex gap-2 justify-between">
          {recipe && <DaysDropDown id={recipe.id} portions={recipe.portions} />}
          <div className="flex gap-4 items-center py-2">
            <EditButton callback={() => push(`/recipes/${params.id}/edit`)} />
            <DeleteButton callback={handleDeleteRecipe} />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Recipe;
