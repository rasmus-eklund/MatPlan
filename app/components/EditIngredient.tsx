import { IngredientId } from '@/types';
import React, { useState } from 'react';
import units from '../db/units';
import DeleteButton from './DeleteButton';
import { deleteExraIngredient, updateExtraIngredient } from '../db/extraIngredients';

type Prop = {
  ingredient: IngredientId;
  callback: () => Promise<void>;
};

const EditIngredient = ({
  ingredient: {id, name, unit, quantity },
  callback,
}: Prop) => {
  const [unitState, setUnitState] = useState(unit);
  const [quantState, setQuantState] = useState(quantity);
  const [editState, setEdiState] = useState(false);
  const handleSave = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await updateExtraIngredient(id, {
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
      <li className="border-2 flex gap-5 items-center p-1">
        <p className="grow">{name}</p>
        <div className="flex gap-2 justify-self-end">
          <p>{quantState}</p>
          <p>{unitState}</p>
        </div>
        <div className="flex gap-2 justify-self-end">
          <button
            className="border-2 border-black rounded-md bg-gray-400"
            type="button"
            onClick={() => {
              setEdiState(true);
            }}
          >
            Ändra
          </button>
          <DeleteButton callback={() => handleDelete()} />
        </div>
      </li>
    );
  } else {
    return (
      <li className="border-2">
        <form className="flex gap-5 items-center p-1">
          <p className="grow">{name}</p>
          <div className="flex gap-2 justify-self-end">
            <input
              className='w-20'
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
                <option key={u.abr}>{u.abr}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2 justify-self-end">
            <button
              className="border-2 border-black rounded-md bg-gray-400"
              onClick={() => setEdiState(false)}
            >
              Avbryt
            </button>
            <button
              className="border-2 rounded-md border-black bg-green-400"
              onClick={handleSave}
            >
              Spara
            </button>
          </div>
        </form>
      </li>
    );
  }
};

export default EditIngredient;
