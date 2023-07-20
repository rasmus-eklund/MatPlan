"use client";
import { FullRecipe, Recipe_ingredient } from "@/types";
import React, { useState } from "react";
import { updateIngredient, updateRecipe } from "../api/prisma";

const IngredientForm = ({ ingredient }: { ingredient: Recipe_ingredient }) => {
  const [ingName, setIngname] = useState<string>(ingredient.ingredientName);
  const [quantity, setQuantity] = useState<number>(ingredient.quantity);
  const [unit, setUnit] = useState<string>(ingredient.unit);

  const updatedIngredient: Recipe_ingredient = {
    id: ingredient.id,
    ingredientName: ingName,
    quantity: quantity,
    unit: unit,
    recipeId: ingredient.recipeId,
  };

  return (
    <>
      <form>
        <label>Ingredient Name:</label>
        <input
          type="text"
          value={ingName}
          onChange={(e) => setIngname(e.target.value)}
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <label>Unit:</label>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <button onClick={() => updateIngredient(updatedIngredient)}>
          Update
        </button>
      </form>
    </>
  );
};

const RecipeForm = ({ recipe }: { recipe: FullRecipe }) => {
  const [recipeName, setRecipeName] = useState<string>(recipe.name);
  const [recipePortions, setRecipePortions] = useState<number>(recipe.portions);
  const [recipeInstructions, setRecipeInstructions] = useState<string>(
    recipe.instruction
  );

  const updatedRecipe: FullRecipe = {
    id: recipe.id,
    name: recipeName,
    portions: recipePortions,
    recipe_ingredient: recipe.recipe_ingredient,
    instruction: recipeInstructions,
    userId: recipe.userId,
  };

  return (
    <form>
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
      <label>Ingredients</label>
      <ul>
        {recipe.recipe_ingredient.map((i) => (
          <li key={i.id}>
            <IngredientForm ingredient={i} />
          </li>
        ))}
      </ul>
      <label>Instructions:</label>
      <input
        type="text"
        value={recipeInstructions}
        onChange={(e) => setRecipeInstructions(e.target.value)}
      />
      <button onClick={() => updateRecipe(updatedRecipe)}>Modify</button>
    </form>
  );
};

export default RecipeForm;
