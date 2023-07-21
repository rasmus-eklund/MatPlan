'use client';

import React, { useEffect, useState } from 'react';
import { getIngredients } from '../db/prisma';
import { IngredientType } from '@/types';
import { useDebounce } from 'usehooks-ts';

type Prop = { callback: (ingredient: string) => Promise<void> };

const SearchIngredients = ({ callback }: Prop) => {
  const [allIngredients, setAllIngredients] = useState<IngredientType[]>([]);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 200);

  useEffect(() => {
    getIngredients().then(ings => {
      setAllIngredients(ings);
    });
  }, []);

  return (
    <div className="flex flex-col relative">
      <label htmlFor="search_ingredient_extra">Sök</label>
      <input
        className=""
        id="search_ingredient_extra"
        type="text"
        value={search}
        onChange={e => setSearch(e.target.value)}
        placeholder="vara"
      />
      <ul className='absolute top-full bg-slate-400 border-2'>
        {debouncedSearch.length > 1 &&
          allIngredients
            .filter(({ name }) => name.includes(debouncedSearch))
            .map(({ name }) => (
              <li className='hover:bg-sky-600' key={name + '_search'}>
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
