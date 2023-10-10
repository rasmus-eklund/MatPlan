'use client';
import {
  RecipeFront,
  RecipeIngredientFront,
  RecipeSearch,
  SearchParams,
} from '@/types';
import { FC, useState } from 'react';
import SearchIngredients from '@/app/components/SearchIngredient';
import EditIngredient from '@/app/components/EditIngredient';
import SearchRecipeForm from './SearchRecipeForm';
import { SearchRecipeByFilter } from '../utils/utils';
import DeleteButton from './buttons/DeleteButton';
import Button from './buttons/Button';

type RecipeFormProp = {
  recipe: RecipeFront;
  recipes: RecipeSearch[];
  update: (recipe: RecipeFront, recipes: RecipeSearch[]) => void;
  closeForm: () => void;
};

const RecipeForm: FC<RecipeFormProp> = props => {
  const [recipe, setRecipe] = useState<RecipeFront>(props.recipe);
  const [connectedRecipes, setConnectedRecipes] = useState<RecipeSearch[]>(
    props.recipes
  );
  const [recipeSearchResult, setRecipeSearchResult] = useState<RecipeSearch[]>(
    []
  );

  const handleUpdateRecipe = async () => {
    props.update(recipe, connectedRecipes);
  };

  const handleAddIngredient = (name: string) => {
    const ingredient = { name, quantity: 1, unit: 'st' };
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ingredient] });
  };

  const handleDeleteIngredient = (i: number) => {
    setRecipe({
      ...recipe,
      ingredients: recipe.ingredients.filter((_, index) => index !== i),
    });
  };

  const handleUpdateIngredient = (ing: RecipeIngredientFront, i: number) => {
    setRecipe(prev => {
      const newIngsredients = prev.ingredients;
      newIngsredients[i] = ing;
      return { ...prev, ingredients: newIngsredients };
    });
  };

  const handleSearchRecipe = (params: SearchParams) => {
    SearchRecipeByFilter(params).then(res => {
      setRecipeSearchResult(res);
    });
  };

  const handleAddRecipe = (recipe: RecipeSearch) => {
    setConnectedRecipes([...connectedRecipes, recipe]);
  };

  const handleRemoveRecipe = (id: string) => {
    setConnectedRecipes(connectedRecipes.filter(r => r.id !== id));
  };

  return (
    <section className="flex flex-col rounded-md bg-3 gap-5">
      <input
        className="text-1 bg-3 text-3xl font-bold"
        type="text"
        value={recipe.name}
        onChange={e => setRecipe({ ...recipe, name: e.target.value })}
      />
      <div className="rounded-md bg-2 p-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="text-4 text-lg">Portioner</h2>
          <input
            className="rounded-md w-10 text-center text-1 bg-3"
            type="number"
            value={recipe.portions}
            onChange={e =>
              setRecipe({ ...recipe, portions: Number(e.target.value) })
            }
          />
        </div>
        <div className="flex flex-col bg-2">
          <h2 className="text-4 text-lg">Ingredienser</h2>
          <div className="bg-3 p-2 rounded-md">
            <SearchIngredients callback={handleAddIngredient} />
            <ul className="flex flex-col gap-1 py-2">
              {recipe.ingredients.map((ing, i) => (
                <EditIngredient
                  ingredient={ing}
                  remove={async () => handleDeleteIngredient(i)}
                  save={async () => handleUpdateIngredient(ing, i)}
                  key={crypto.randomUUID()}
                  editable={true}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className="flex flex-col">
          <h2 className="text-4 text-lg">Instruktion</h2>
          <textarea
            className="bg-3 text-1 rounded-md p-2"
            value={recipe.instruction}
            onChange={e =>
              setRecipe({ ...recipe, instruction: e.target.value })
            }
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-4 text-lg">Recept</h2>
          <div className="flex flex-col gap-2 bg-3 p-2 rounded-md">
            <SearchRecipeForm
              handleSearch={handleSearchRecipe}
              onlySearch={true}
            />
            <ul className="flex flex-col gap-2">
              {recipeSearchResult.map(r => (
                <li
                  onClick={() => handleAddRecipe(r)}
                  className="flex px-2 text-1 font-bold bg-4 rounded-md cursor-pointer items-center hover:bg-1 hover:text-4"
                  key={r.id + 'searchResult'}
                >
                  <p>{r.name}</p>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-1 py-2">
              {connectedRecipes.map(rec => (
                <li
                  key={rec.id + 'contained'}
                  className="flex px-2 text-1 font-bold bg-4 rounded-md items-center justify-between"
                >
                  <p>{rec.name}</p>
                  <DeleteButton callback={() => handleRemoveRecipe(rec.id)} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="self-end flex gap-2">
        <Button name='Spara' callback={handleUpdateRecipe} />
        <Button name='Stäng' callback={props.closeForm} />
      </div>
    </section>
  );
};

export default RecipeForm;
