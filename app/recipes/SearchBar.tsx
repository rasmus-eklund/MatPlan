'use client';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { FilterParams, Recipe, SearchRecipeParams } from '@/types';
import {
  createNewRecipe,
  deleteRecipe,
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
} from '../db/recipes';
import SearchResults from './SearchResults';
import { useRouter } from 'next/navigation';

const SearchBar = () => {
  const router = useRouter();
  const options: FilterParams[] = ['name', 'ingredients', 'instruction'];
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterParams>(options[0]);
  const debouncedSearch = useDebounce(search, 500);
  const [results, setResults] = useState<Recipe[]>([]);

  const createNew = async () => {
    const id = await createNewRecipe();
    router.push('/recipes/' + id);
  };

  const handleDelete = async (id: string) => {
    await deleteRecipe(id);
    setSearch(search);
    setResults(await getRecipeByName(search));
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
    handleSearch({ filter, search: debouncedSearch });
  }, [debouncedSearch, filter]);
  return (
    <>
      <section className="flex flex-wrap bg-3 gap-2 items-center rounded-md p-2">
        <div className="flex rounded-md h-10 w-full">
          <input
            className="bg-4 text-xl px-2 w-full"
            id="search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Sök"
          />
        </div>
        <select
          className="rounded-md bg-4 text-xl h-10 px-2"
          name="filter"
          id="filter"
          value={filter}
          onChange={e => setFilter(e.target.value as FilterParams)}
        >
          <option value="name">Namn</option>
          <option value="ingredients">Ingredient</option>
          <option value="instruction">Instruktion</option>
        </select>
        <button
          className="bg-4 rounded-md text-xl h-10 px-2"
          onClick={() => createNew()}
        >
          Nytt recept
        </button>
      </section>
      <SearchResults recipeResult={results} deleteRecipe={handleDelete} />
    </>
  );
};
export default SearchBar;
