"use client";
import { capitalize } from "@/app/utils/utils";
import {
  Category,
  IngredientCat,
  IngredientFilter,
  Subcategory,
} from "@/types";
import React, { FC, useState } from "react";
import FilterIngredients from "./IngredientFilter";
import { filterIngredients } from "./utils";
import SelectedIngredient from "./SelectedIngredient";
import PlusButton from "../buttons/PlusButton";
import { addIngredient } from "@/app/server-side/admin";
import { useRouter } from "next/navigation";

type ShowIngredientsProps = {
  ingredients: IngredientCat[];
  categories: Category[];
  subcategories: Subcategory[];
};
const ShowIngredients: FC<ShowIngredientsProps> = ({
  ingredients,
  categories,
  subcategories,
}) => {
  const [filter, setFilter] = useState<IngredientFilter>({
    search: "",
    category: -1,
    subcategory: -1,
    asc: true,
  });
  const filteredIngredients = filterIngredients(filter, ingredients);
  const [selected, setSelected] = useState<IngredientCat>(ingredients[0]);
  const [category, setCategory] = useState<IngredientCat>(selected);
  const router = useRouter();

  const update = (ing?: IngredientCat) => {
    router.refresh();
    if (ing) {
      setSelected(ing);
      setCategory(ing);
      return;
    }
    setSelected(ingredients[0]);
    setCategory(ingredients[0]);
  };
  const handleAddNewIngredient = async () => {
    const ing = await addIngredient({
      name: filter.search,
      categoryId: 0,
      subcategoryId: 0,
    });
    update(ing);
  };
  const handleSelectIngredient = (ing: IngredientCat) => {
    setSelected(ing);
    setCategory(ing);
  };

  const isNewIngredient =
    filteredIngredients.length === 0 && filter.search.length !== 0;

  return (
    <section className="flex flex-col">
      <div className="flex">
        <FilterIngredients
          categories={categories}
          filter={filter}
          setFilter={setFilter}
        />
        {isNewIngredient && <PlusButton callback={handleAddNewIngredient} />}
      </div>
      <div className="flex flex-col md:flex-row gap-1">
        <List name="Ingredienser">
          {filteredIngredients.map((i) => (
            <Ingredient
              key={i.name}
              ingredient={i}
              selected={i.name === selected.name}
              setSelected={handleSelectIngredient}
            />
          ))}
        </List>
        <List name="Kategori">
          {categories.map((i) => (
            <li
              onClick={() =>
                setCategory((prev) => ({ ...prev!, categoryId: i.id }))
              }
              className={`px-2 cursor-pointer hover:bg-c4 ${
                i.id === selected.categoryId && "bg-c3"
              } ${category && i.id === category.categoryId && "bg-c4"}`}
              key={i.name + i.id}
            >
              {capitalize(i.name)}
            </li>
          ))}
        </List>
        <List name="Underkategori">
          {subcategories
            .filter((subcat) => subcat.categoryId === category.categoryId)
            .map((i) => (
              <li
                onClick={() =>
                  setCategory((prev) => ({ ...prev, subcategoryId: i.id }))
                }
                key={i.name + i.id + i.categoryId}
                className={`px-2 cursor-pointer hover:bg-c3 ${
                  i.id === selected.subcategoryId && "bg-c3"
                } ${i.id === category.subcategoryId && "bg-c4"}`}
              >
                {capitalize(i.name)}
              </li>
            ))}
        </List>
      </div>
      <SelectedIngredient
        ingredient={selected}
        edited={category}
        cat={categories}
        sub={subcategories}
        update={update}
      />
    </section>
  );
};

type IngredientProps = {
  ingredient: IngredientCat;
  setSelected: (ingredient: IngredientCat) => void;
  selected: boolean;
};
const Ingredient: FC<IngredientProps> = ({
  ingredient,
  setSelected,
  selected,
}) => {
  return (
    <li
      onClick={() => setSelected(ingredient)}
      className={`px-2 cursor-pointer md:hover:bg-c3 ${selected && "bg-c4"}`}
      key={ingredient.name}
    >
      {capitalize(ingredient.name)}
    </li>
  );
};

type ListProps = {
  name: string;
  children: React.ReactNode;
};
const List: FC<ListProps> = ({ children, name }) => {
  return (
    <div className="flex flex-col">
      <h2 className="text-xl self-center">{name}</h2>
      <ul className="bg-c1 border-2 border-c5 overflow-y-auto h-28 md:h-96 md:w-52">
        {children}
      </ul>
    </div>
  );
};

export default ShowIngredients;
