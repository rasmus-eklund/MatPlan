import { addIngredient } from '@/types';
import React, { useState } from 'react';
import units from '../db/units';
import DeleteButton from './DeleteButton';
import { deleteExraIngredient, upsertExtraIngredient } from '../db/prisma';

type Prop = {
  ingredient: addIngredient;
  callback: () => Promise<void>;
};

const EditIngredient = ({
  ingredient: { name, unit, quantity },
  callback,
}: Prop) => {
  const [unitState, setUnitState] = useState(unit);
  const [quantState, setQuantState] = useState(quantity);
  const [editState, setEdiState] = useState(false);
  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await upsertExtraIngredient({
      name,
      quantity: quantState,
      unit: unitState,
    });
    setEdiState(false);
  };
  const handleDelete = async () => {
    await deleteExraIngredient(name);
    await callback();
  };
  if (!editState) {
    return (
      <li className="border-2 grid grid-cols-5 items-center">
        <p>{name}</p>
        <p>{quantState}</p>
        <p>{unitState}</p>
        <button
          className="border-2"
          type="button"
          onClick={() => {
            setEdiState(true);
          }}
        >
          edit
        </button>
        <DeleteButton callback={() => handleDelete()} />
      </li>
    );
  } else {
    return (
      <li className="border-2">
        <form className="grid grid-cols-5">
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
              <option key={u.abr}>
                {u.abr}
              </option>
            ))}
          </select>
          <button className='border-2 rounded-md border-black bg-green-400' onClick={handleSave}>spara</button>
          <button onClick={() => setEdiState(false)}>avbryt</button>
        </form>
      </li>
    );
  }
};

export default EditIngredient;
