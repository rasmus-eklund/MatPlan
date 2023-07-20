'use client';
import { FullRecipe } from '@/types';
import React, { useState } from 'react';
import { updateRecipe } from '../api/prisma';
import IngredientForm from './IngredientForm';

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
        onChange={e => setRecipeName(e.target.value)}
      />
      <label>Portions:</label>
      <input
        type="number"
        value={recipePortions}
        onChange={e => setRecipePortions(parseInt(e.target.value))}
      />
      <label>Ingredients</label>
      <ul>
        {recipe.recipe_ingredient.map(i => (
          <li key={i.id}>
            <IngredientForm ingredient={i} />
          </li>
        ))}
      </ul>
      <label>Instructions:</label>
      <input
        type="text"
        value={recipeInstructions}
        onChange={e => setRecipeInstructions(e.target.value)}
      />
      <button onClick={() => updateRecipe(updatedRecipe)}>Modify</button>
    </form>
  );
};

export default RecipeForm;
