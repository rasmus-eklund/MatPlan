"use client"
import { useState } from 'react';
import { useDebounce } from 'usehooks-ts';
import { FilterParams, Recipe, SearchRecipeParams } from '@/types';
import { searchRecipes } from '@/client/recipes';

const handleSearch = async ({ search, filter }: SearchRecipeParams) => {
  const recipes = await searchRecipes({ search, filter });
};

const Recipes = async () => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<FilterParams>('name');
  const [recipeResult, setRecipeResult] = useState<Recipe[]>([]);
  const debouncedSearch = useDebounce(search, 500);

  const query = await handleSearch({ filter, search: debouncedSearch });
  return (
    <>
      <main className="recipe">
        <h1 className="recipe__title">Lägg till maträtter</h1>
        <form
          className="recipe__form"
          onSubmit={e => {
            e.preventDefault();
          }}
        >
          <label htmlFor="search">Sök</label>
          <input
            id="search"
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <label htmlFor="filter">Filter</label>
          <select
            name="filter"
            id="filter"
            value={filter}
            onChange={e => setFilter(e.target.value as FilterParams)}
          >
            <option value="name">Namn</option>
            <option value="ingredients">Ingredient</option>
            <option value="instruction">Instruktion</option>
          </select>
        </form>{' '}
      </main>
    </>
  );
};
export default Recipes;

/* 
    
      <ul className="recipe__list">
        {query.status === 'loading' && <p>Loading...</p>}
        {query.status === 'error' && <p>Error...</p>}
        {query.status === 'success' &&
          query.data.map(recipe => (
            <ItemRecipe
              key={recipe.id}
              selected={recipe.id === display?.id}
              recipe={recipe}
              callback={handleSelected}
            />
          ))}
      </ul>
      {display && (
        <section>
          <DisplayRecipe recipe={display} />
          <span>
            <button>Edit</button>
            <button onClick={() => setDisplay(null)}>x</button>
          </span>
        </section>
      )}
*/
