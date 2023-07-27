'use client';
import { getRecipeById } from '@/app/db/prisma';
import { FullRecipe } from '@/types';
import React, { useEffect, useState } from 'react';
import RecipeForm from './EditRecipe';
import ShowRecipe from './ShowRecipe';
import EditButton from '@/app/components/EditButton';

const Recipe = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<FullRecipe | null>(null);
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
    <main className="bg-2 flex flex-col min-h-screen p-6 ">
      <section className="bg-3 p-2">
        {!editMode && recipe && <ShowRecipe recipe={recipe} />}
        {editMode && recipe && (
          <RecipeForm recipe={recipe} updateParentUI={handleGetRecipe} />
        )}
        {!editMode && (
          <div className="flex gap-2 justify-end mx-8 py-1 ">
            <EditButton callback={() => setEditMode(true)} />
          </div>
        )}
      </section>
    </main>
  );
};

export default Recipe;
