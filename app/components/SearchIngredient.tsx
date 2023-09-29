"use client";

import React, { useEffect, useState } from "react";
import { getIngredients } from "../db/ingredients";
import { IngredientType } from "@/types";
import { useDebounce } from "usehooks-ts";

type Prop = {
  callback: (ingredient: string) => Promise<void>;
};

const SearchIngredients = ({ callback }: Prop) => {
  const [allIngredients, setAllIngredients] = useState<IngredientType[]>([]);
  const [searchResults, setSearchResults] = useState<string[]>([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(0);
  const debouncedSearch = useDebounce(search, 200);

  useEffect(() => {
    getIngredients().then((ings) => {
      setAllIngredients(ings);
    });
  }, []);

  useEffect(() => {
    if (debouncedSearch.length > 1) {
      const result = allIngredients
        .filter(({ name }) => name.includes(debouncedSearch))
        .map(i => i.name);
      setSearchResults(result);
      setSelected(0);
    }
  }, [debouncedSearch, allIngredients]);

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (searchResults.length > 0) {
        await callback(searchResults[selected]);
        setSearch('');
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
      <div className='flex items-center'>
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
      <ul className="absolute top-full bg-4 w-full">
        {debouncedSearch.length > 1 &&
          searchResults.map((name, i) => (
            <li
              className={`hover:bg-3 ${
                i === selected ? 'bg-3' : ''
              }`}
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
    </section>
  );
};

export default SearchIngredients;
