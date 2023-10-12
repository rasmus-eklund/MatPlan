'use client';
import Loading from '@/app/components/Loading';
import ShowRecipe from '@/app/components/ShowRecipe';
import { getRecipeById } from '@/app/db/recipes';
import { RecipeFront } from '@/types';
import { useEffect, useState } from 'react';

const Page = ({
  params,
}: {
  params: { slug: [id: string, portions: number] };
}) => {
  const [recipe, setRecipe] = useState<RecipeFront>();
  const [id, portions] = params.slug;

  useEffect(() => {
    getRecipeById(id).then(res => setRecipe(res));
  }, [id]);

  return (
    <main className="bg-2 p-5 grow overflow-y-auto">
      <section className="flex flex-col gap-5 bg-3 p-8 lg: max-w-screen-sm">
        {recipe ? (
          <ShowRecipe recipe={recipe} id={id} scale={portions}></ShowRecipe>
        ) : (
          <Loading />
        )}
      </section>
    </main>
  );
};

export default Page;
