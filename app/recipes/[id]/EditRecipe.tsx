'use client';
import { FullRecipe, Recipe_ingredient } from '@/types';
import { useState } from 'react';
import { updateRecipe } from '../../db/recipes';
import {
  createIngredient,
  deleteIngredient,
  updateIngredient,
} from '@/app/db/ingredients';
import SaveButton from '../../components/buttons/Save';
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
    <form className="flex flex-col rounded-md bg-3 gap-5">
      <input
        className="text-1 bg-3 text-3xl font-bold"
        type="text"
        value={recipeName}
        onChange={e => setRecipeName(e.target.value)}
      />
      <div className="rounded-md bg-2 p-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="text-4 text-lg">Portioner</h2>
          <input
            className="rounded-md w-10 text-center text-1 bg-3"
            type="number"
            value={recipePortions}
            onChange={e => setRecipePortions(parseInt(e.target.value))}
          />
        </div>

        <div className="flex flex-col bg-2">
          <h2 className="text-4 text-lg">Ingredienser</h2>
          <div className="bg-3 p-2 rounded-md">
            <SearchIngredients callback={handleAddIngredient} />
            <ul className="flex flex-col gap-1 py-2">
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
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-4 text-lg">Instruktion</h2>
          <textarea
            className="bg-3 text-1 rounded-md p-2"
            value={recipeInstructions}
            onChange={e => setRecipeInstructions(e.target.value)}
          />
        </div>
      </div>
      <div className="self-end">
        <SaveButton callback={handleUpdateRecipe} />
      </div>
    </form>
  );
};

export default RecipeForm;
