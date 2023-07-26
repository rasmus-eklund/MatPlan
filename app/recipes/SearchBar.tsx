'use client';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { FilterParams, Recipe, SearchRecipeParams } from '@/types';
import {
  deleteRecipe,
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
} from '../db/prisma';
import SearchResults from './SearchResults';

const SearchBar = () => {
  const options: FilterParams[] = ['name', 'ingredients', 'instruction'];
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterParams>(options[0]);
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState<Recipe[]>([]);
  const [addRecipeActive, setAddReciepActive] = useState(false);

  const handleDelete = async (id: string) => {
    await deleteRecipe(id);
    setSearch('');
    const data = await getRecipeByName(search);
    setResults(data);
  };

  useEffect(() => {
    const handleSearch = async ({ filter, search }: SearchRecipeParams) => {
      if (filter === 'ingredients') {
        setResults(await getRecipeByIngredient(search));
      }
      if (filter === 'instruction') {
        setResults(await getRecipeByInstructions(search));
      }
      if (filter === 'name') {
        setResults(await getRecipeByName(search));
      }
    };
    console.log('Did something');
    handleSearch({ filter, search: debouncedSearch });
  }, [debouncedSearch, filter]);
  return (
    <main>
      {!addRecipeActive && (
        <>
          <section className="recipe text-left my-1.5">
            <h1 className="recipe__title font-bold p-1.5 px-4 ">
              Lägg till maträtter
            </h1>
            <input
              className="border-2 p-1.5 px-4 rounded-md border-black m-4"
              id="search"
              type="text"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <select
              className="border-2 p-1.5 px-4 rounded-md border-black m-4"
              name="filter"
              id="filter"
              value={filter}
              onChange={e => setFilter(e.target.value as FilterParams)}
            >
              <option value="name">Namn</option>
              <option value="ingredients">Ingredient</option>
              <option value="instruction">Instruktion</option>
            </select>
            <button onClick={() => setAddReciepActive(true)}>
              Skapa nytt recept
            </button>
          </section>
          <SearchResults recipeResult={results} deleteRecipe={handleDelete} />
        </>
      )}
    </main>
  );
};
export default SearchBar;
