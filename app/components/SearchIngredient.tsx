"use client";

import React, { useEffect, useState } from "react";
import { getIngredients } from "../db/prisma";
import { IngredientType } from "@/types";
import { useDebounce } from "usehooks-ts";

type Prop = {
  callback: (ingredient: string) => Promise<void>;
};

const SearchIngredients = ({ callback }: Prop) => {
  const [allIngredients, setAllIngredients] = useState<IngredientType[]>([]);
  const [search, setSearch] = useState("");
  const debouncedSearch = useDebounce(search, 200);

  useEffect(() => {
    getIngredients().then((ings) => {
      setAllIngredients(ings);
    });
  }, []);

  return (
    <>
      <label htmlFor="search_ingredient_extra">Search</label>
      <input
        id="search_ingredient_extra"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="vara"
      />
      <ul>
        {debouncedSearch.length > 1 &&
          allIngredients
            .filter(({ name }) => name.includes(debouncedSearch))
            .map(({ name }) => (
              <li key={name + "_search"}>
                <p
                  onClick={(e) => {
                    e.preventDefault();
                    callback(name).then(() => setSearch(""));
                  }}
                >
                  {name}
                </p>
              </li>
            ))}
      </ul>
    </>
  );
};

export default SearchIngredients;
