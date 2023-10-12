"use client";
import {
  IngredientCat,
  Recipe,
  RecipeIngredient,
  RecipeSearch,
  SearchParams,
} from "@/types";
import { FC, useState } from "react";
import SearchIngredients from "@/app/components/SearchIngredient";
import EditIngredient from "@/app/components/EditIngredient";
import SearchRecipeForm from "./SearchRecipeForm";
import DeleteButton from "../buttons/DeleteButton";
import Button from "../buttons/Button";
import { SearchRecipeByFilter } from "@/app/db/recipes";

type RecipeFormProp = {
  recipe: Recipe;
  update: (recipe: Recipe) => void;
  closeForm: () => void;
};

const RecipeForm: FC<RecipeFormProp> = ({
  recipe: incomingRecipe,
  update,
  closeForm,
}) => {
  const [recipe, setRecipe] = useState<Recipe>(incomingRecipe);
  const [recipeSearchResult, setRecipeSearchResult] = useState<RecipeSearch[]>(
    [],
  );

  const handleAddIngredient = (ing: IngredientCat) => {
    const ingredient: RecipeIngredient = {
      name: ing.name,
      quantity: 1,
      unit: "st",
      id: crypto.randomUUID(),
      recipeId: recipe.id,
    };
    setRecipe((prev) => ({
      ...prev,
      ingredients: [...recipe.ingredients, ingredient],
    }));
  };

  const handleDeleteIngredient = (ing: RecipeIngredient) => {
    setRecipe((prev) => ({
      ...prev,
      ingredients: prev.ingredients.filter((i) => i.id !== ing.id),
    }));
  };

  const handleUpdateIngredient = (ing: RecipeIngredient) => {
    setRecipe((prev) => {
      const oldIngs = prev.ingredients.filter((i) => i.id !== ing.id);
      return { ...prev, ingredients: [...oldIngs, ing] };
    });
  };

  const handleSearchRecipe = (params: SearchParams) => {
    SearchRecipeByFilter(params).then((res) => {
      setRecipeSearchResult(res);
    });
  };

  const handleAddRecipe = (recipe: RecipeSearch) => {
    setRecipe((prev) => ({ ...prev, children: [...prev.children, recipe] }));
  };

  const handleRemoveRecipe = (id: string) => {
    setRecipe((prev) => ({
      ...prev,
      children: prev.children.filter((r) => r.id !== id),
    }));
  };

  return (
    <section className="flex flex-col rounded-md bg-3 gap-5">
      <input
        className="text-1 bg-3 text-3xl font-bold"
        type="text"
        value={recipe.name}
        onChange={(e) =>
          setRecipe((prev) => ({ ...prev, name: e.target.value }))
        }
      />
      <div className="rounded-md bg-2 p-4 flex flex-col gap-2">
        <div className="flex justify-between">
          <h2 className="text-4 text-lg">Portioner</h2>
          <input
            className="rounded-md w-10 text-center text-1 bg-3"
            type="number"
            value={recipe.portions}
            onChange={(e) =>
              setRecipe((prev) => ({
                ...prev,
                portions: Number(e.target.value),
              }))
            }
          />
        </div>
        <div className="flex flex-col bg-2">
          <h2 className="text-4 text-lg">Ingredienser</h2>
          <div className="bg-3 p-2 rounded-md">
            <SearchIngredients callback={handleAddIngredient} />
            <ul className="flex flex-col gap-1 py-2">
              {recipe.ingredients.map((ing) => (
                <EditIngredient<RecipeIngredient>
                  ingredientIn={ing}
                  remove={handleDeleteIngredient}
                  update={handleUpdateIngredient}
                  key={ing.id}
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
            onChange={(e) =>
              setRecipe((prev) => ({ ...prev, instruction: e.target.value }))
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
              {recipeSearchResult.map((r) => (
                <li
                  onClick={() => handleAddRecipe(r)}
                  className="flex px-2 text-1 font-bold bg-4 rounded-md cursor-pointer items-center hover:bg-1 hover:text-4"
                  key={r.id + "searchResult"}
                >
                  <p>{r.name}</p>
                </li>
              ))}
            </ul>
            <ul className="flex flex-col gap-1 py-2">
              {recipe.children.map((rec) => (
                <li
                  key={rec.id + "contained"}
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
        <Button name="Spara" callback={() => update(recipe)} />
        <Button name="Stäng" callback={closeForm} />
      </div>
    </section>
  );
};

export default RecipeForm;
