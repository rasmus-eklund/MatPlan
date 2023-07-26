"use client";
import { getRecipeById } from "@/app/db/prisma";
import { FullRecipe } from "@/types";
import React, { useEffect, useState } from "react";
import RecipeForm from "../RecipeForm";
import DaysDropDown from "@/app/components/DaysDropDown";

const Recipe = ({ params }: { params: { id: string } }) => {
  const [recipe, setRecipe] = useState<FullRecipe | null>(null);
  const [editMode, setEditMode] = useState<Boolean>(false);
  const handleGetRecipe = async (id: string) => {
    const res = await getRecipeById(id);
    const data: FullRecipe = JSON.parse(res);
    setRecipe(data);
  };

  useEffect(() => {
    handleGetRecipe(params.id);
  }, [params.id]);
  return (
    <>
      {!editMode && recipe && (
        <section>
          <h3>{recipe.name}</h3>
          <p>{recipe.portions}</p>
          <ul>
            {recipe.recipe_ingredient.map((i) => (
              <li key={i.id}>
                <span>{i.ingredientName}</span>
                <span>{i.quantity}</span>
                <span>{i.unit}</span>
              </li>
            ))}
          </ul>
          <p>{recipe?.instruction}</p>
          <label
            htmlFor="filter"
            className="border-2 p-1.5 px-4 rounded-md border-black m-4"
          >
            Day
          </label>
          <DaysDropDown id={recipe.id} portions={recipe?.portions} />
        </section>
      )}
      {editMode && recipe && <RecipeForm recipe={recipe} />}
      <button
        onClick={() => {
          setEditMode(true);
        }}
      >
        Edit
      </button>
    </>
  );
};

export default Recipe;
