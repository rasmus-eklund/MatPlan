"use client";
import { useEffect, useState } from "react";
import { useDebounce } from "usehooks-ts";
import { FilterParams, Recipe, SearchRecipeParams } from "@/types";
import {
  createNewRecipe,
  deleteRecipe,
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
} from "../db/prisma";
import SearchResults from "./SearchResults";

import { useRouter } from "next/navigation";

const SearchBar = () => {
  const router = useRouter();
  const options: FilterParams[] = ["name", "ingredients", "instruction"];
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<FilterParams>(options[0]);
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState<Recipe[]>([]);

  const createNew = async () => {
    const id = await createNewRecipe();
    router.push("/recipes/" + id);
  };

  const handleDelete = async (id: string) => {
    await deleteRecipe(id);
    setSearch(search);
    setResults(await getRecipeByName(search));
  };

  useEffect(() => {
    const handleSearch = async ({ filter, search }: SearchRecipeParams) => {
      if (filter === "ingredients") {
        setResults(await getRecipeByIngredient(search));
      }
      if (filter === "instruction") {
        setResults(await getRecipeByInstructions(search));
      }
      if (filter === "name") {
        setResults(await getRecipeByName(search));
      }
    };
    handleSearch({ filter, search: debouncedSearch });
  }, [debouncedSearch, filter]);
  return (
    <main>
      <>
        <section className="flex text-left my-1.5 justify-between gap-2">
          <div className="search flex  bg-3 w-2/3 h-20 justify-center items-center">
            <div className="searchBar flex-col w-2/3 justify-center align-middle">
              <h1 className="recipe__title font-bold ">Sök</h1>
              <input
                className="border-2 rounded-md border-black"
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <div className="filter flex-col w-1/3 content-center">
              <h1 className="recipe__title font-bold ">Filtrera</h1>

              <select
                className="border-2 rounded-md border-black"
                name="filter"
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value as FilterParams)}
              >
                <option value="name">Namn</option>
                <option value="ingredients">Ingredient</option>
                <option value="instruction">Instruktion</option>
              </select>
            </div>
          </div>

          <div className="addNewRecipe flex content-center bg-3 w-1/3 justify-center h-20">
            <button onClick={() => createNew()}>Skapa nytt recept</button>
          </div>
        </section>
        <SearchResults recipeResult={results} deleteRecipe={handleDelete} />
      </>
    </main>
  );
};
export default SearchBar;
