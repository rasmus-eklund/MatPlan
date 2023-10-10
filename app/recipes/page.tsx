'use client';
import { useEffect, useState } from 'react';
import { RecipeFront, RecipeSearch, SearchParams } from '@/types';
import SearchRecipeForm from '../components/recipes/SearchRecipeForm';
import FoundRecipes from '../components/recipes/FoundRecipes';
import { addRecipe } from '../db/recipes';
import {
  parseAsString,
  parseAsStringEnum,
  useQueryState,
} from 'next-usequerystate';
import RecipeForm from '../components/recipes/RecipeForm';
import { SearchRecipeByFilter } from '../utils/utils';

enum Filter {
  name = 'name',
  ingredients = 'ingredient',
  instruction = 'instruction',
}

const SearchRecipeComponent = () => {
  const [results, setResults] = useState<RecipeSearch[]>([]);
  const [search, setSearch] = useQueryState('q', parseAsString.withDefault(''));
  const [filter, setFilter] = useQueryState(
    'filter',
    parseAsStringEnum<Filter>(Object.values(Filter)).withDefault(Filter.name)
  );
  const [formHidden, setFormHidden] = useState(true);

  useEffect(() => {
    SearchRecipeByFilter({ filter, search }).then(res => setResults(res));
  }, [filter, search]);

  const handleSearch = async ({ search, filter }: SearchParams) => {
    setSearch(search);
    setFilter(filter as Filter);
    setResults(await SearchRecipeByFilter({ search, filter }));
  };

  const createNewRecipe = (recipe: RecipeFront, recipes: RecipeSearch[]) => {
    addRecipe(recipe, recipes)
      .then(() => SearchRecipeByFilter({ search, filter }))
      .then(res => setResults(res));
    setFormHidden(true);
  };

  const emptyRecipe: RecipeFront = {
    instruction: 'Instruktion',
    name: 'Nytt recept',
    portions: 2,
    ingredients: [],
  };

  return (
    <main className="p-4 bg-2 flex flex-col gap-2 grow overflow-y-auto">
      {formHidden && (
        <SearchRecipeForm handleSearch={handleSearch} onlySearch={false} />
      )}
      {!formHidden && (
        <div className="flex flex-col gap-5 bg-3 p-8 lg: max-w-screen-sm">
          <RecipeForm
            recipe={emptyRecipe}
            recipes={[]}
            update={createNewRecipe}
            closeForm={() => setFormHidden(true)}
          />
        </div>
      )}
      {formHidden && (
        <>
          <button
            onClick={() => setFormHidden(!formHidden)}
            className="bg-4 rounded-md text-xl h-10 px-6"
          >
            Nytt recept
          </button>
          <FoundRecipes recipeResult={results} />
        </>
      )}
    </main>
  );
};

export default SearchRecipeComponent;
