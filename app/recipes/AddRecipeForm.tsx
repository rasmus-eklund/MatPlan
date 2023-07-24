"use client";
import {
  FullRecipe,
  IngredientType,
  Recipe_ingredient,
  addIngredient,
} from "@/types";
import React, { useState } from "react";

import { updateIngredient, updateRecipe } from "../db/prisma";
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
    const recipeId = await updateRecipe(updatedRecipe);
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
      <label>Recipe Name:</label>
      <input
        type="text"
        className="border-2 border-black"
        value={recipeName}
        onChange={(e) => {
          setRecipeName(e.target.value);
        }}
      />
      <label>Portions:</label>
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
      <label>Instructions:</label>
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
        ADD
      </button>
    </form>
  );
};

export default AddRecipeForm;
