'use client';
import { FullRecipe, Recipe_ingredient } from '@/types';
import { useState } from 'react';
import {
  createIngredient,
  deleteIngredient,
  updateIngredient,
  updateRecipe,
} from '../../db/prisma';
import SaveButton from '../../components/SaveButton';
import SearchIngredients from '@/app/components/SearchIngredient';
import EditIngredient from '@/app/components/EditIngredient';
type Prop = {
  recipe: FullRecipe;
  updateParentUI: (id: string) => Promise<void>;
};

const RecipeForm = ({ recipe, updateParentUI }: Prop) => {
  const [recipeName, setRecipeName] = useState<string>(recipe.name);
  const [recipePortions, setRecipePortions] = useState<number>(recipe.portions);
  const [recipeInstructions, setRecipeInstructions] = useState<string>(
    recipe.instruction
  );

  const [ingredients, setIngredients] = useState<Recipe_ingredient[]>(
    recipe.recipe_ingredient
  );

  const handleUpdateRecipe = async () => {
    const updatedRecipe: FullRecipe = {
      id: recipe.id,
      name: recipeName,
      portions: recipePortions,
      recipe_ingredient: ingredients,
      instruction: recipeInstructions,
    };
    await updateRecipe(updatedRecipe);
    for (const i of ingredients) {
      await updateIngredient(i);
    }
    await updateParentUI(recipe.id);
  };

  const handleAddIngredient = async (name: string) => {
    const newIng = await createIngredient(recipe.id, {
      name,
      quantity: 1,
      unit: 'st',
    });
    setIngredients([...ingredients, newIng]);
  };

  const handleDelete = async (id: string) => {
    await deleteIngredient(id);
    setIngredients(ingredients.filter(i => i.id !== id));
  };

  const handleUpdate = async (ing: Recipe_ingredient) => {
    await updateIngredient(ing);
    setIngredients(
      ingredients.map(i => {
        if (i.id === ing.id) {
          return ing;
        }
        return i;
      })
    );
  };

  return (
    <form className="border-2 p-1.5 px-4 rounded-md border-black m-4">
      <label>Receptets namn:</label>
      <input
        type="text"
        value={recipeName}
        onChange={e => setRecipeName(e.target.value)}
      />
      <label>Portioner:</label>
      <input
        type="number"
        value={recipePortions}
        onChange={e => setRecipePortions(parseInt(e.target.value))}
      />
      <SearchIngredients callback={handleAddIngredient} />
      <ul>
        {ingredients.map(i => (
          <EditIngredient
            ingredient={{ ...i, name: i.ingredientName }}
            remove={async () => handleDelete(i.id)}
            save={async ing =>
              handleUpdate({
                ingredientName: ing.name,
                id: i.id,
                quantity: ing.quantity,
                recipeId: i.recipeId,
                unit: ing.unit,
              })
            }
            key={i.id}
          />
        ))}
      </ul>
      <label>Instruktion:</label>
      <input
        type="text"
        value={recipeInstructions}
        onChange={e => setRecipeInstructions(e.target.value)}
      />
      <SaveButton callback={handleUpdateRecipe} />
    </form>
  );
};

export default RecipeForm;
