import { Recipe_ingredient } from '@/types';
import { useState } from 'react';
import { deleteIngredient, updateIngredient } from '../db/prisma';
import units from '../db/units';

type Prop = {
  ingredient: Recipe_ingredient;
  // callback: void;
};

const IngredientForm = ({ ingredient }: Prop) => {
  const [quantity, setQuantity] = useState<number>(ingredient.quantity);
  const [unit, setUnit] = useState<string>(ingredient.unit);

  const updatedIngredient: Recipe_ingredient = {
    id: ingredient.id,
    ingredientName: ingredient.ingredientName,
    quantity: quantity,
    unit: unit,
    recipeId: ingredient.recipeId,
  };

  return (
    <>
      <li className="border-2" key={ingredient.id}>
        <p>{ingredient.ingredientName}</p>
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value))}
        />
        <label>Unit:</label>
        <select
          id="edit-unit"
          name="unit"
          value={unit}
          onChange={e => setUnit(e.target.value)}
        >
          {units.map(u => (
            <option key={u.abr}>{u.abr}</option>
          ))}
        </select>
        <button
          className="border-2 rounded-md border-black bg-green-400"
          onClick={e => {
            e.preventDefault();
            updateIngredient(updatedIngredient);
          }}
        >
          Uppdatera
        </button>
        <button
          className="border-2 rounded-md border-black bg-red-400"
          onClick={e => {
            e.preventDefault();
            deleteIngredient(ingredient.id);
          }}
        >
          Ta bort
        </button>
      </li>
    </>
  );
};

export default IngredientForm;
