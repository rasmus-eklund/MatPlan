import { Ingredient } from '@/types';
import React, { useState } from 'react';
import units from '../db/constants/units';
import DeleteButton from './buttons/Delete';

import EditButton from './buttons/Edit';
import Cancel from './buttons/Cancel';
import SaveButton from './buttons/Save';

type Prop = {
  ingredient: Ingredient;
  remove: () => Promise<void>;
  save: (ingredient: Ingredient) => Promise<void>;
};

const EditIngredient = ({
  ingredient: { name, unit, quantity },
  remove,
  save,
}: Prop) => {
  const [unitState, setUnitState] = useState(unit);
  const [quantState, setQuantState] = useState(quantity);
  const [editState, setEdiState] = useState(false);

  if (!editState) {
    return (
      <li className="flex justify-between items-center bg-4 text-2 rounded-md px-2 py-1">
        <p className="grow">{name}</p>
        <div className="flex gap-2">
          <p>
            {quantState} {unitState}
          </p>
          <EditButton callback={() => setEdiState(true)} />
          <DeleteButton callback={remove} />
        </div>
      </li>
    );
  } else {
    return (
      <li className="flex justify-between items-center bg-4 text-2 rounded-md px-2 py-1">
        <p className="text-1">{name}</p>
        <form className="flex items-center">
          <input
            className="w-16"
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

          <div className="flex gap-2 justify-self-end">
            <Cancel callback={() => setEdiState(false)} />
            <SaveButton
              callback={async () => {
                {
                  await save({ name, quantity: quantState, unit: unitState });
                  setEdiState(false);
                }
              }}
            ></SaveButton>
          </div>
        </form>
      </li>
    );
  }
};

export default EditIngredient;
