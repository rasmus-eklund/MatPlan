'use client';

import { FC, useEffect, useState } from 'react';
import { getIngredientCategories } from '../db/items';
import { IngredientCat } from '@/types';

type SearchIngredientsProp = {
  callback: (ingredient: string) => void;
};

const SearchIngredients: FC<SearchIngredientsProp> = ({ callback }) => {
  const [allIngredients, setAllIngredients] = useState<IngredientCat[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    getIngredientCategories().then(ings => {
      setAllIngredients(ings);
    });
  }, []);

  useEffect(() => {
    if (search.length > 1) {
      const result = allIngredients
        .filter(({ name }) => name.includes(search.toLowerCase()))
        .map(i => i.name)
        .sort((a, b) => a.length - b.length);
      setSearchResults(result);
      setSelected(0);
    }
  }, [search, allIngredients]);

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchResults.length > 0) {
        callback(searchResults[selected]);
        setSearch('');
        setSearchResults([]);
      }
    }
    const len = searchResults.length;
    if (e.key === 'ArrowDown') {
      const target = selected === len - 1 ? len - 1 : selected + 1;
      setSelected(target);
    }
    if (e.key === 'ArrowUp') {
      const target = selected === 0 ? 0 : selected - 1;
      setSelected(target);
    }
  };

  return (
    <section className="flex flex-col relative align-middle">
      <div className="flex items-center">
        <input
          className="w-full rounded-md px-4 py-2 outline-none bg-4 focus:bg-5"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Lägg till vara..."
          onKeyDown={handleEnter}
          autoFocus={true}
          autoComplete="off"
        />
      </div>
      <ul className="absolute top-10 bg-4 w-full z-1">
        {search.length > 1 &&
          searchResults.map((name, i) => (
            <li
              className={`hover:bg-3 ${i === selected ? 'bg-3' : ''}`}
              key={name + '_search'}
            >
              <p
                onClick={() => {
                  callback(name);
                  setSearch('');
                }}
              >
                {name}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default SearchIngredients;
