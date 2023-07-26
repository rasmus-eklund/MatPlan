"use client";
import {
  Recipe_ingredient,
} from "@/types";
import React, { useState } from "react";

import { updateIngredient, upsertRecipe } from "../db/prisma";
import AddIngredientForm, { Ingdisplay } from "./AddIngredientForm";

type Prop = {
  callback: () => Promise<void>;
};

const AddRecipeForm = ({ callback }: Prop) => {
  const [recipeName, setRecipeName] = useState("");
  const [recipePortions, setRecipePortions] = useState(0);
  const [recipeInstrcution, setRecipeInstruction] = useState("");
  const [ingredients, setIngredients] = useState<Recipe_ingredient[]>([]);

  const updatedRecipe = {
    id: "",
    name: recipeName,
    portions: recipePortions,
    recipe_ingredient: [],
    instruction: recipeInstrcution,
    userId: "jarjar.jarsson@gmail.com",
  };

  const handlesAddReicpe = async () => {
    const recipeId = await upsertRecipe(updatedRecipe);
    console.log(recipeId);
    ingredients.map(async (i: Recipe_ingredient) => {
      i.id = "";
      i.recipeId = recipeId;
      console.log(i);
      await updateIngredient(i);
    });
    setRecipeName("");
    setRecipePortions(0);
    setRecipeInstruction("");
    setIngredients([]);
  };

  const handleAddIngredient = (ing: Recipe_ingredient) => {
    setIngredients([...ingredients, ing]);
  };

  const handleDeleteIng = (ing: Recipe_ingredient) => {
    const newIng = ingredients.filter(
      (i) => i.ingredientName !== ing.ingredientName
    );
    setIngredients(newIng);
  };

  return (
    <form className="border-2 p-1.5 px-4 rounded-md border-black m-4">
      <label>Receptets namn:</label>
      <input
        type="text"
        className="border-2 border-black"
        value={recipeName}
        onChange={(e) => {
          setRecipeName(e.target.value);
        }}
      />
      <label>Portioner:</label>
      <input
        type="number"
        className="border-2 border-black"
        value={recipePortions}
        onChange={(e) => {
          setRecipePortions(parseInt(e.target.value));
        }}
      />
      <AddIngredientForm callback={handleAddIngredient} />
      <ul>
        {ingredients.map((i) => {
          return <Ingdisplay key={crypto.randomUUID()} ing={i} callback={handleDeleteIng} />;
        })}
      </ul>
      <label>Instruktioner:</label>
      <input
        type="text"
        className="border-2 border-black"
        value={recipeInstrcution}
        onChange={(e) => {
          setRecipeInstruction(e.target.value);
        }}
      />
      <button
        onClick={(e) => {
          e.preventDefault();
          handlesAddReicpe();
          callback();
        }}
      >
        Lägg till
      </button>
    </form>
  );
};

export default AddRecipeForm;


// <form
//               className="recipe__form"
//               onSubmit={e => {
//                 e.preventDefault();
//               }}
//             >
//               <label
//                 htmlFor="search"
//                 className="border-2 p-1.5 px-4 rounded-md border-black m-4"
//               >
//                 Sök
//               </label>
//               <input
//                 className="border-2 p-1.5 px-4 rounded-md border-black m-4"
//                 id="search"
//                 type="text"
//                 value={search}
//                 onChange={e => setSearch(e.target.value)}
//               />
//               <br />
//               <label
//                 htmlFor="filter"
//                 className="border-2 p-1.5 px-4 rounded-md border-black m-4"
//               >
//                 Filtrera
//               </label>
//               <select
//                 className="border-2 p-1.5 px-4 rounded-md border-black m-4"
//                 name="filter"
//                 id="filter"
//                 value={filter}
//                 onChange={e => setFilter(e.target.value as FilterParams)}
//               >
//                 <option value="name">Namn</option>
//                 <option value="ingredients">Ingredient</option>
//                 <option value="instruction">Instruktion</option>
//               </select>
//             </form>
//             <button onClick={handleAddNewRecipe}>Lägg till nytt recept</button>