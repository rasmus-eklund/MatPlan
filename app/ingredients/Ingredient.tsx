'use client';
import React, { ChangeEvent, useState } from 'react';
import units from '../db/units';
import { upsertExtraIngredient } from '../db/prisma';
import { addIngredient } from '@/types';

const Ingredient = ({
  ingredient: { name, quantity, unit },
}: {
  ingredient: addIngredient;
}) => {
  const [unitState, setUnitState] = useState(unit);
  const [quantState, setQuantState] = useState(quantity);
  const update = async () => {
    upsertExtraIngredient({
      name,
      quantity: quantState,
      unit: unitState,
    });
  };
  const handleQuant = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setQuantState(e.target.value);
    // await update();
  };

  const handleUnit = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    // setUnitState()
  };
  return (
    <>
      <p>{name}</p>
      <input type="number" value={quantState} min={0} />
      <select
        name="selectUnit"
        id="unit"
        value={unitState}
        onChange={handleUnit}
      >
        {units.map(u => (
          <option value={unitState} key={u.abr}>
            {u.abr}
          </option>
        ))}
      </select>
    </>
  );
};

export default Ingredient;
