import { Recipe_ingredient } from "@/types";
import { useState } from "react";
import { updateIngredient } from "../api/prisma";

const IngredientForm = ({ ingredient }: { ingredient: Recipe_ingredient }) => {
  const [ingName, setIngname] = useState<string>(ingredient.ingredientName);
  const [quantity, setQuantity] = useState<number>(ingredient.quantity);
  const [unit, setUnit] = useState<string>(ingredient.unit);

  const updatedIngredient: Recipe_ingredient = {
    id: ingredient.id,
    ingredientName: ingName,
    quantity: quantity,
    unit: unit,
    recipeId: ingredient.recipeId,
  };

  return (
    <>
      <div>
        <label>Ingredient Name:</label>
        <input
          type="text"
          value={ingName}
          onChange={(e) => setIngname(e.target.value)}
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
        <button onClick={() => updateIngredient(updatedIngredient)}>
          Update
        </button>
      </div>
    </>
  );
};

export default IngredientForm