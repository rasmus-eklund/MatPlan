'use client';
import { useEffect, useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { FilterParams, FullRecipe, Recipe, SearchRecipeParams } from '@/types';

import {
  addRecipeToMenu,
  getRecipeById,
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
  removeRecipeFromMenu,
} from '../db/prisma';
import RecipeForm from '../recipeform/page';

const Recipes = () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterParams>('name');
  const [recipeResult, setRecipeResult] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<FullRecipe | null>(null);
  const debouncedSearch = useDebounce(search, 500);

  const handleSearch = async ({ filter, search }: SearchRecipeParams) => {
    let data: Recipe[];
    switch (filter) {
      case 'ingredients':
        data = await getRecipeByIngredient(search, 'Rasmus');
        setRecipeResult(data);
        break;

      case 'name':
        data = await getRecipeByName(search, 'Rasmus');
        setRecipeResult(data);
        break;

      case 'instruction':
        data = await getRecipeByInstructions(search, 'Rasmus');
        setRecipeResult(data);
        break;

      default:
        break;
    }
  };

  const handleShowRecipe = async (id: string) => {
    const res = await getRecipeById(id, 'Rasmus');
    const recipe: FullRecipe = JSON.parse(res);
    setSelectedRecipe(recipe);
  };

  useEffect(() => {
    handleSearch({ filter, search: debouncedSearch }).then(r => {});
  }, [debouncedSearch, filter]);
  return (
    <>
      <main className="recipe text-left my-1.5">
        <h1 className="recipe__title font-bold">Lägg till maträtter</h1>
        <form
          className="recipe__form"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <label htmlFor="search">Sök</label>
          <input
            className="border-2 border-black rounded-md my-2.5"
            id="search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <br />
          <label htmlFor="filter">Filter</label>
          <select
            className="border-2 border-black rounded-md"
            name="filter"
            id="filter"
            value={filter}
            onChange={e => setFilter(e.target.value as FilterParams)}
          >
            <option value="name">Namn</option>
            <option value="ingredients">Ingredient</option>
            <option value="instruction">Instruktion</option>
          </select>
        </form>
        <ul>
          {recipeResult.map(r => (
            <li
              className="my-1 py-1 border-b-2 font-bold"
              key={r.id}
              onClick={() => handleShowRecipe(r.id)}
            >
              {r.name}
            </li>
          ))}
        </ul>
        {selectedRecipe && (
          <section>
            <button
              className="border-2 p-1.5 px-4 rounded-md border-red-400 m-2"
              onClick={() =>
                addRecipeToMenu({
                  id: selectedRecipe.id,
                  userId: 'Rasmus',
                  portions: selectedRecipe.portions,
                })
              }
            >
              add
            </button>
            <button
              className="border-2 p-1.5 px-4 rounded-md border-red-400 m-2"
              onClick={() => removeRecipeFromMenu(selectedRecipe.id, 'Rasmus')}
            >
              delete
            </button>

            <h3>{selectedRecipe.name}</h3>
            <p>{selectedRecipe.portions}</p>
            <ul className="border-4 border-blue-400">
              {selectedRecipe.recipe_ingredient.map(i => (
                <li className="border-2 border-grey-200" key={i.id}>
                  <span>{i.ingredientName}</span>
                  <span>{i.quantity}</span>
                  <span>{i.unit}</span>
                </li>
              ))}
            </ul>
            <p className="py-4 border-4 border-red-400">
              {selectedRecipe.instruction}
            </p>
            <button>Edit</button>
            <RecipeForm recipe={selectedRecipe} />
          </section>
        )}
      </main>
    </>
  );
};
export default Recipes;
