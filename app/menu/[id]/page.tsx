"use client";
import Loading from "@/app/components/Loading";
import ShowRecipe from "@/app/components/recipes/ShowRecipe";
import { getMenuRecipeById } from "@/app/server-side/recipes";
import { Recipe } from "@/types";
import { useEffect, useState } from "react";

const Page = ({ params: { id } }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<Recipe>();

  useEffect(() => {
    getMenuRecipeById(id).then((res) => setRecipe(res));
  }, [id]);

  return <>{recipe ? <ShowRecipe recipe={recipe} /> : <Loading />}</>;
};

export default Page;
