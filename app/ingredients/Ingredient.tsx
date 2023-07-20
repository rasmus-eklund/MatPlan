import { ExtraIngredient } from '@/types';
import React, { useState } from 'react';
import units from '../db/units';

const Ingredient = ({
  ingredient: { name, quantity, unit, userId },
}: {
  ingredient: ExtraIngredient;
}) => {
  const [unitState, setUnitState] = useState(unit);
  const [quantState, setQuantState] = useState(quantity);

  return (
    <>
      <p>{name}</p>
      <input type="number" value={quantState} min={0}/>
      <select name="selectUnit" id="unit" value={unitState}>
        {units.map(u => (
          <option>{u.abr}</option>
        ))}
      </select>
    </>
  );
};

export default Ingredient;
