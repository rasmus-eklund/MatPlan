'use client';
import { getRecipeById } from '@/app/db/recipes';
import { FullRecipe } from '@/types';
import React, { useEffect, useState } from 'react';
import RecipeForm from './EditRecipe';
import ShowRecipe from './ShowRecipe';
import EditButton from '@/app/components/buttons/Edit';
import DaysDropDown from '@/app/components/DaysDropDown';

const Recipe = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<FullRecipe>();
  const [editMode, setEditMode] = useState<Boolean>(false);
  const handleGetRecipe = async (id: string) => {
    const res = await getRecipeById(id);
    const data: FullRecipe = JSON.parse(res);
    setRecipe(data);
    setEditMode(false);
  };

  useEffect(() => {
    handleGetRecipe(params.id);
  }, [params.id]);

  return (
    <main className="bg-2 min-h-screen p-5">
      <section className="flex flex-col gap-5 bg-3 p-8 lg: max-w-screen-sm">
        {!editMode && recipe && <ShowRecipe recipe={recipe} />}
        {editMode && recipe && (
          <RecipeForm recipe={recipe} updateParentUI={handleGetRecipe} />
        )}
        {!editMode && (
          <div className="flex gap-2 justify-between">
            {recipe && (
              <DaysDropDown id={recipe.id} portions={recipe.portions} />
            )}
            <EditButton callback={() => setEditMode(true)} />
          </div>
        )}
      </section>
    </main>
  );
};

export default Recipe;
