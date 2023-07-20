import { FullRecipe } from "@/types";
import React from "react";

type Props = {};

const RecipeForm = (recipe: FullRecipe) => {
  return (
    <form>
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
      <p>{recipe.instruction}</p>
    </form>
  );
};

export default RecipeForm;
