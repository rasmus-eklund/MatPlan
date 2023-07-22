'use client';

import React, { useEffect, useState } from 'react';
import { getIngredients } from '../db/prisma';
import { IngredientType } from '@/types';
import { useDebounce } from 'usehooks-ts';

type Prop = { callback: (ingredient: string) => Promise<void> };

const SearchIngredients = ({ callback }: Prop) => {
  const [allIngredients, setAllIngredients] = useState<IngredientType[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);

  useEffect(() => {
    getIngredients().then(ings => {
      setAllIngredients(ings);
    });
  }, []);

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      if (searchResults.length > 0) {
        await callback(searchResults[0]);
        await setSearch('');
      }
    }
  };
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    if (debouncedSearch.length > 1) {
      const result = allIngredients
        .filter(({ name }) => name.includes(debouncedSearch))
        .map(i => i.name);
      setSearchResults(result);
    }
  };

  return (
    <div className="flex flex-col relative">
      <label htmlFor="search_ingredient_extra">Sök</label>
      <input
        className=""
        id="search_ingredient_extra"
        type="text"
        value={search}
        onChange={handleSearch}
        placeholder="vara"
        onKeyDown={handleEnter}
      />
      <ul className="absolute top-full bg-slate-400 border-2">
        {debouncedSearch.length > 1 &&
          searchResults.map((name, i) => (
            <li
              className={`hover:bg-sky-600 ${!i ? 'bg-sky-600' : ''}`}
              key={name + '_search'}
            >
              <p
                onClick={() => {
                  callback(name).then(() => setSearch(''));
                }}
              >
                {name}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default SearchIngredients;
