"use client";
import { capitalize } from "@/app/utils/utils";
import { Category, IngredientCat, Subcategory } from "@/types";
import React, { FC, useState } from "react";

type Props = {
  ingredients: IngredientCat[];
  categories: Category[];
  subcategories: Subcategory[];
};

const ShowIngredients: FC<Props> = ({
  ingredients,
  categories,
  subcategories,
}) => {
  const [selected, setSelected] = useState<IngredientCat>();
  return (
    <div className="flex gap-5">
      <div className="flex flex-col">
        <h2 className="text-xl">Ingredienser</h2>
        <ul className="bg-c1 border-2 border-c5 p-2 overflow-y-auto h-96">
          {ingredients.map((i) => (
            <li
              onClick={() => setSelected(i)}
              className={`cursor-pointer hover:bg-c4 ${i.name === selected?.name && 'bg-c3'}`}
              key={i.name}
            >
              {capitalize(i.name)}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl">Kategori</h2>
        <ul className="bg-c1 border-2 border-c5 p-2">
          {selected &&
            categories.map((i) => (
              <li className={`cursor-pointer hover:bg-c4 ${i.id === selected.categoryId && 'bg-c3'}`} key={i.name + i.id}>
                {capitalize(i.name)}
              </li>
            ))}
        </ul>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl">Underkategori</h2>
        <ul className="bg-c1 border-2 border-c5 p-2">
          {selected &&
            subcategories
              .filter((subcat) => subcat.categoryId === selected.categoryId)
              .map((i) => (
                <li
                  className={`cursor-pointer hover:bg-c4 ${i.id === selected.subcategoryId && 'bg-c3'}`}
                  key={i.name + i.id + i.categoryId}
                >
                  {capitalize(i.name)}
                </li>
              ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowIngredients;
