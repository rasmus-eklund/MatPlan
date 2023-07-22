"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { FilterParams, FullRecipe, Recipe, SearchRecipeParams } from "@/types";
import {
  deleteRecipe,
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
} from "../db/prisma";
import Link from "next/link";
import AddRecipeForm from "./AddRecipeForm";

const Recipes = () => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterParams>("name");
  const [recipeResult, setRecipeResult] = useState<Recipe[]>([]);
  const debouncedSearch = useDebounce(search, 500);

  const handleDelete = async (id: string) => {
    await deleteRecipe(id);
    setSearch("");
    const data = await getRecipeByName(search);
    setRecipeResult(data);
  };

  const handleSearch = async ({ filter, search }: SearchRecipeParams) => {
    let data: Recipe[];
    switch (filter) {
      case "ingredients":
        data = await getRecipeByIngredient(search);
        setRecipeResult(data);
        break;

      case "name":
        data = await getRecipeByName(search);
        setRecipeResult(data);
        break;

      case "instruction":
        data = await getRecipeByInstructions(search);
        setRecipeResult(data);
        break;

      default:
        break;
    }
  };

  const handleAddRecipe = async () => {
    setSearch("");
    const data = await getRecipeByName(search);
    setRecipeResult(data);
  };

  useEffect(() => {
    handleSearch({ filter, search: debouncedSearch });
  }, [debouncedSearch, filter]);
  return (
    <>
      <main className="recipe text-left my-1.5">
        <h1 className="recipe__title font-bold p-1.5 px-4 ">
          Lägg till maträtter
        </h1>
        <form
          className="recipe__form"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <label
            htmlFor="search"
            className="border-2 p-1.5 px-4 rounded-md border-black m-4"
          >
            Sök
          </label>
          <input
            className="border-2 p-1.5 px-4 rounded-md border-black m-4"
            id="search"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <br />
          <label
            htmlFor="filter"
            className="border-2 p-1.5 px-4 rounded-md border-black m-4"
          >
            Filter
          </label>
          <select
            className="border-2 p-1.5 px-4 rounded-md border-black m-4"
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
        <div>
          <label>Add new recipe</label>
          <AddRecipeForm callback={handleAddRecipe} />
        </div>
        <ul>
          {recipeResult.map((r) => (
            <li
              className="border-2 p-1.5 px-4 rounded-md border-black m-4"
              key={r.id}
            >
              <Link href={`/recipes/${r.id}`}>{r.name}</Link>
              <br></br>
              <button
                onClick={() => {
                  handleDelete(r.id);
                }}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    </>
  );
};
export default Recipes;
