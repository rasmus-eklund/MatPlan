"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { FilterParams, FullRecipe, Recipe, SearchRecipeParams } from "@/types";

import {
  addRecipeToMenu,
  getRecipeById,
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
  removeRecipeFromMenu,
} from "../db/prisma";

const Recipes = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterParams>("name");
  const [recipeResult, setRecipeResult] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<FullRecipe | null>(null);
  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = async ({ filter, search }: SearchRecipeParams) => {
    let data: Recipe[];
    switch (filter) {
      case "ingredients":
        data = await getRecipeByIngredient(search, "Rasmus");
        setRecipeResult(data);
        break;

      case "name":
        data = await getRecipeByName(search, "Rasmus");
        setRecipeResult(data);
        break;

      case "instruction":
        data = await getRecipeByInstructions(search, "Rasmus");
        setRecipeResult(data);
        break;

      default:
        break;
    }
  };

  const handleShowRecipe = async (id: string) => {
    const res = await getRecipeById(id, "Rasmus");
    const recipe: FullRecipe = JSON.parse(res);
    setSelectedRecipe(recipe);
  };

  useEffect(() => {
    handleSearch({ filter, search: debouncedSearch }).then((r) => {
    });
  }, [debouncedSearch, filter]);
  return (
    <>
      <main className="recipe">
        <h1 className="recipe__title">Lägg till maträtter</h1>
        <form
          className="recipe__form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label htmlFor="search">Sök</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <label htmlFor="filter">Filter</label>
          <select
            name="filter"
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value as FilterParams)}
          >
            <option value="name">Namn</option>
            <option value="ingredients">Ingredient</option>
            <option value="instruction">Instruktion</option>
          </select>
        </form>
        <ul>
          {recipeResult.map((r) => (
            <li key={r.id} onClick={() => handleShowRecipe(r.id)}>
              {r.name}
            </li>
          ))}
        </ul>
        {selectedRecipe && (
          <section>
            <button
              onClick={() => addRecipeToMenu(selectedRecipe.id, "Rasmus")}
            >
              add
            </button>
            <button
              onClick={() => removeRecipeFromMenu(selectedRecipe.id, "Rasmus")}
            >
              delete
            </button>
            <h3>{selectedRecipe.name}</h3>
            <p>{selectedRecipe.portions}</p>
            <ul>
              {selectedRecipe.recipe_ingredient.map((i) => (
                <li key={i.id}>
                  <span>{i.ingredientName}</span>
                  <span>{i.quantity}</span>
                  <span>{i.unit}</span>
                </li>
              ))}
            </ul>
            <p>{selectedRecipe.instruction}</p>
          </section>
        )}
      </main>
    </>
  );
};
export default Recipes;
