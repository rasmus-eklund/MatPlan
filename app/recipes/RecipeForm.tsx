"use client";
import { FullRecipe, Recipe_ingredient } from "@/types";
import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import { updateRecipe } from "../db/prisma";

const RecipeForm = ({ recipe }: { recipe: FullRecipe }) => {
  const [recipeName, setRecipeName] = useState<string>(recipe.name);
  const [recipePortions, setRecipePortions] = useState<number>(recipe.portions);
  const [recipeInstructions, setRecipeInstructions] = useState<string>(
    recipe.instruction
  );

  const emptyIngredient: Recipe_ingredient = {
    id: "",
    ingredientName: "",
    quantity: 0,
    unit: "",
    recipeId: recipe.id,
  };

  const updatedRecipe: FullRecipe = {
    id: recipe.id,
    name: recipeName,
    portions: recipePortions,
    recipe_ingredient: recipe.recipe_ingredient,
    instruction: recipeInstructions,
    userId: recipe.userId,
  };

  return (
    <form className="border-2 p-1.5 px-4 rounded-md border-black m-4">
      <label>Recipe Name:</label>
      <input
        type="text"
        value={recipeName}
        onChange={(e) => setRecipeName(e.target.value)}
      />
      <label>Portions:</label>
      <input
        type="number"
        value={recipePortions}
        onChange={(e) => setRecipePortions(parseInt(e.target.value))}
      />
      <ul>
        {recipe.recipe_ingredient &&
          recipe.recipe_ingredient.map((i) => (
            <IngredientForm ingredient={i} />
          ))}
      </ul>
      <IngredientForm ingredient={emptyIngredient} />
      <label>Instructions:</label>
      <input
        type="text"
        value={recipeInstructions}
        onChange={(e) => setRecipeInstructions(e.target.value)}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          updateRecipe(updatedRecipe);
        }}
      >
        Modify
      </button>
    </form>
  );
};

export default RecipeForm;
