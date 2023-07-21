import { addIngredient } from '@/types';
import React, { useState } from 'react';
import units from '../db/units';
import DeleteButton from './DeleteButton';
import { upsertExtraIngredient } from '../db/prisma';

const EditIngredient = ({
  ingredient: { name, quantity, unit },
}: {
  ingredient: addIngredient;
}) => {
  const [unitState, setUnitState] = useState(unit);
  const [quantState, setQuantState] = useState(quantity);
  const [editState, setEdiState] = useState(false);
  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await upsertExtraIngredient({name, quantity, unit});
    setEdiState(false);
  };
  if (!editState) {
    return (
      <li className="border-2  grid grid-cols-5">
        <p>{name}</p>
        <p>{quantity}</p>
        <p>{unit}</p>
        <button
          className="border-2"
          type="button"
          onClick={() => {
            setEdiState(true);
          }}
        >
          edit
        </button>
        <DeleteButton callback={() => console.log('delete')} />
      </li>
    );
  } else {
    return (
      <li className="border-2">
        <form className="">
          <p>{name}</p>
          <input
            id="edit-quantity"
            type="number"
            name="quantity"
            value={quantState}
            onChange={e => setQuantState(Number(e.target.value))}
          />
          <select
            id="edit-unit"
            name="unit"
            value={unitState}
            onChange={e => setUnitState(e.target.value)}
          >
            {units.map(u => (
              <option value={unitState} key={u.abr}>
                {u.abr}
              </option>
            ))}
          </select>
          <button onClick={handleSave}>save</button>
        </form>
      </li>
    );
  }
};

export default EditIngredient;
