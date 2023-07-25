import { IngredientId } from '@/types';
import React, { useState } from 'react';
import units from '../db/units';
import DeleteButton from './DeleteButton';
import {
  deleteExraIngredient,
  updateExtraIngredient,
} from '../db/extraIngredients';
import EditButton from './EditButton';
import Cancel from './Cancel';
import SaveButton from './SaveButton';

type Prop = {
  ingredient: IngredientId;
  callback: () => Promise<void>;
};

const EditIngredient = ({
  ingredient: { id, name, unit, quantity },
  callback,
}: Prop) => {
  const [unitState, setUnitState] = useState(unit);
  const [quantState, setQuantState] = useState(quantity);
  const [editState, setEdiState] = useState(false);
  const handleSave = async () => {
    await updateExtraIngredient(id, {
      name,
      quantity: quantState,
      unit: unitState,
    });
    setEdiState(false);
  };
  const handleDelete = async () => {
    await deleteExraIngredient(id);
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
          <EditButton callback={() => setEdiState(true)} />
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
              className="w-20"
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
            <Cancel callback={() => setEdiState(false)} />
            <SaveButton callback={handleSave}></SaveButton>
          </div>
        </form>
      </li>
    );
  }
};

export default EditIngredient;
