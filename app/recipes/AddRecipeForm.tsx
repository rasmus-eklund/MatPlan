"use client";
import { FullRecipe, Recipe_ingredient } from "@/types";
import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import { updateRecipe } from "../db/prisma";
import AddIngredientForm from "./AddIngredientForm";

const AddRecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipePortions, setRecipePortions] = useState(0);
  const [recipeInstrcution, setRecipeInstruction] = useState("");
  const [recipeInfo, setRecipeInfo] = useState("");

  const updatedRecipe = {
    name: recipeName,
    portions: recipePortions,
    instruction: recipeInstrcution,
    userId: "jarjar.jarsson@gmail.com",
  };

  // const handlesAddReicpe = async() => {
  //   await
  // };

  return (
    <form className="border-2 p-1.5 px-4 rounded-md border-black m-4">
      <label>Recipe Name:</label>
      <input
        type="text"
        value={recipeName}
        onChange={(e) => {
          setRecipeName(e.target.value);
        }}
      />
      <label>Portions:</label>
      <input
        type="number"
        value={recipePortions}
        onChange={(e) => {
          setRecipePortions(parseInt(e.target.value));
        }}
      />
      <label>Ingredient:</label>
      <AddIngredientForm />

      <label>Instructions:</label>
      <input
        type="text"
        value={recipeInstrcution}
        onChange={(e) => {
          setRecipeInstruction(e.target.value);
        }}
      />
      <button>Modify</button>
    </form>
  );
};

export default AddRecipeForm;
