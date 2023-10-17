"use client";
import { Category, IngredientFilter } from "@/types";
import { FC, useEffect, useState } from "react";
import DropDown from "../DropDown";
import { debounce } from "./utils";
import UpIcon from "../icons/UpIcon";
import DownIcon from "../icons/DownIcon";

type FilterIngredientsProps = {
  filter: IngredientFilter;
  setFilter: React.Dispatch<React.SetStateAction<IngredientFilter>>;
  categories: Category[];
};

const FilterIngredients: FC<FilterIngredientsProps> = ({
  filter,
  setFilter,
  categories,
}) => {
  const [search, setSearch] = useState("");

  useEffect(() => {
    debounce(() => setFilter((prev) => ({ ...prev, search: search })));
  }, [search, setFilter]);

  const catOptions = [
    { name: "Välj", value: -1 },
    ...categories.map(({ name, id }) => ({ name, value: id })),
  ];

  return (
    <div className="flex flex-col">
      <div className="flex">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="max-w-min">
        <DropDown
          initial={filter.category}
          options={catOptions}
          cb={(value) =>
            setFilter((prev) => ({
              ...prev,
              category: Number(value),
            }))
          }
        />
      </div>
      <p>Sortera på bokstavsordning</p>
      <div className="flex gap-1">
        <button onClick={() => setFilter((prev) => ({ ...prev, asc: false }))}>
          <UpIcon className="h-6" />
        </button>
        <button onClick={() => setFilter((prev) => ({ ...prev, asc: true }))}>
          <DownIcon className="h-6" />
        </button>
      </div>
    </div>
  );
};

export default FilterIngredients;
