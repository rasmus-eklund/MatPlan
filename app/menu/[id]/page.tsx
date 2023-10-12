'use client';
import Loading from '@/app/components/Loading';
import ShowRecipe from '@/app/components/ShowRecipe';
import { getMenuRecipeById } from '@/app/db/recipes';
import { Recipe } from '@/types';
import { useEffect, useState } from 'react';

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    getMenuRecipeById(id).then(res => setRecipe(res));
  }, [id]);

  return (
    <main className="bg-2 p-5 grow overflow-y-auto">
      <section className="flex flex-col gap-5 bg-3 p-8 lg: max-w-screen-sm">
        {recipe ? <ShowRecipe recipe={recipe} /> : <Loading />}
      </section>
    </main>
  );
};

export default Page;