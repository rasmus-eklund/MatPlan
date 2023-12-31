"use client";

import { FC, useEffect, useState } from "react";
import { getIngredientCategories } from "../server-side/items";
import { IngredientCat } from "@/types";

type SearchIngredientsProp = {
  callback: (ingredient: IngredientCat) => void;
};

const SearchIngredients: FC<SearchIngredientsProp> = ({ callback }) => {
  const [allIngredients, setAllIngredients] = useState<IngredientCat[]>([]);
  const [searchResults, setSearchResults] = useState<IngredientCat[]>([]);
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    getIngredientCategories().then((ings) => {
      setAllIngredients(ings);
    });
  }, []);

  useEffect(() => {
    if (search.length > 1) {
      const result = allIngredients
        .filter(({ name }) => name.includes(search.toLowerCase()))
        .sort((a, b) => a.name.length - b.name.length);
      setSearchResults(result);
      setSelected(0);
    }
  }, [search, allIngredients]);

  const handleEnter = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (searchResults.length > 0) {
        callback(searchResults[selected]);
        setSearch("");
        setSearchResults([]);
      }
    }
    const len = searchResults.length;
    if (e.key === "ArrowDown") {
      const target = selected === len - 1 ? len - 1 : selected + 1;
      setSelected(target);
    }
    if (e.key === "ArrowUp") {
      const target = selected === 0 ? 0 : selected - 1;
      setSelected(target);
    }
  };

  return (
    <section className="flex flex-col relative align-middle">
      <div className="flex items-center">
        <input
          className="w-full rounded-md px-4 py-2 outline-none bg-c2 focus:bg-c1"
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Lägg till vara..."
          onKeyDown={handleEnter}
          autoComplete="off"
        />
      </div>
      <ul className="absolute top-10 bg-c2 w-full">
        {search.length > 1 &&
          searchResults.map((ing, i) => (
            <li
              className={`hover:bg-c3 ${i === selected ? "bg-c3" : ""}`}
              key={ing.name + "_search"}
            >
              <p
                onClick={() => {
                  callback(ing);
                  setSearch("");
                }}
              >
                {ing.name}
              </p>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default SearchIngredients;
