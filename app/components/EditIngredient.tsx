import { Ingredient } from '@/types';
import React, { useState } from 'react';
import units from '../db/units';
import DeleteButton from './DeleteButton';

import EditButton from './EditButton';
import Cancel from './Cancel';
import SaveButton from './SaveButton';

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
      <li className="flex gap-5 items-center bg-4 text-2 rounded-md px-4 py-1">
        <p className="grow">{name}</p>
        <div className="flex gap-2 justify-self-end">
          <p>{quantState}</p>
          <p>{unitState}</p>
        </div>
        <div className="flex gap-2 justify-self-end">
          <EditButton callback={() => setEdiState(true)} />
          <DeleteButton callback={remove} />
        </div>
      </li>
    );
  } else {
    return (
      <li className="bg-4 rounded-md px-4 py-1">
        <form className="flex gap-5 items-center">
          <p className="text-1 grow">{name}</p>
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
