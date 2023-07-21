"use client";
import { FullRecipe, Recipe_ingredient } from "@/types";
import React, { useState } from "react";
import IngredientForm from "./IngredientForm";
import { updateIngredient, updateRecipe } from "../db/prisma";
import AddIngredientForm from "./AddIngredientForm";

const AddRecipeForm = () => {
  const [recipeName, setRecipeName] = useState("");
  const [recipePortions, setRecipePortions] = useState(0);
  const [recipeInstrcution, setRecipeInstruction] = useState("");
  const [recipeInfo, setRecipeInfo] = useState("");

  const updatedRecipe = {
    id:'',
    name: recipeName,
    portions: recipePortions,
    recipe_ingredient:[],
    instruction: recipeInstrcution,
    userId: "jarjar.jarsson@gmail.com",
  };

  const handlesAddReicpe = async() => {
    const recipeId = await updateRecipe(updatedRecipe)
    const ingData = localStorage.getItem("ingList") as string;
    const ingList = JSON.parse(ingData);
    ingList.map(async(i:Recipe_ingredient)=>{
      i.id = ""
      i.recipeId = recipeId
      await updateIngredient(i)
    })
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
      <button onClick={(e)=>{
        e.preventDefault()
        handlesAddReicpe()}}>Modify</button>
    </form>
  );
};

export default AddRecipeForm;
