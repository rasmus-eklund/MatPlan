import { Recipe_ingredient, addIngredient } from "@/types";
import { useEffect, useState } from "react";
import { updateIngredient } from "../db/prisma";

const AddIngredientForm = () => {
  const data = localStorage.getItem("ingList") as string;
  const currentList = JSON.parse(data);

  const [ingName, setIngname] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>("");
  const [ingList, setIngList] = useState<addIngredient[]>(currentList);

  const updatedIngredient = {
    ingredientName: ingName,
    quantity: quantity,
    unit: unit,
  };
  return (
    <>
      <div
        onSubmit={(e) => {
          setIngname("");
          setQuantity(0);
          setUnit("");
        }}
      >
        <label>Ingredient Name:</label>
        <input
          type="text"
          value={ingName}
          onChange={(e) => {
            setIngname(e.target.value);
          }}
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value))}
        />
        <label>Unit:</label>
        <input
          type="text"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <button
          type="submit"
          onClick={() => {
            ingList.push(updatedIngredient);
            localStorage.setItem("ingList", JSON.stringify(ingList));
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddIngredientForm;
