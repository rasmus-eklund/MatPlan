'use client';
import ShowRecipe from '@/app/components/ShowRecipe';
import { getRecipeById } from '@/app/db/recipes';
import { Recipe } from '@/types';
import { useEffect, useState } from 'react';

const Page = ({
  params,
}: {
  params: { slug: [id: string, portions: number] };
}) => {
  const [recipe, setRecipe] = useState<Recipe>();
  const [id, portions] = params.slug;

  useEffect(() => {
    getRecipeById(id).then(res => setRecipe(res));
  }, [id]);

  return (
    <main className="bg-2 min-h-screen p-5">
      <section className="flex flex-col gap-5 bg-3 p-8 lg: max-w-screen-sm">
        {recipe && <ShowRecipe recipe={recipe} scale={portions} />}
      </section>
    </main>
  );
};

export default Page;
