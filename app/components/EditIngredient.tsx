import { RecipeIngredientFront } from '@/types';
import { FC, useState } from 'react';
import units from '../db/constants/units';
import DeleteButton from './buttons/DeleteButton';

import EditButton from './buttons/EditButton';
import CancelButton from './buttons/CancelButton';
import SaveButton from './buttons/SaveButton';

type EditIngredientProp = {
  ingredient: RecipeIngredientFront;
  remove: () => Promise<void>;
  save: (ingredient: RecipeIngredientFront) => Promise<void>;
  editable: boolean;
};

const EditIngredient: FC<EditIngredientProp> = ({
  ingredient,
  remove,
  save,
  editable,
}) => {
  const [unit, setUnit] = useState(ingredient.unit);
  const [quant, setQuant] = useState(ingredient.quantity);
  const [edit, setEdit] = useState(false);

  const handleSave = () => {
    save({
      name: ingredient.name,
      quantity: quant,
      unit: unit,
    });
    setEdit(false);
  };

  return (
    <li className="flex justify-between items-center bg-4 text-2 rounded-md px-2 py-1">
      <p className="grow">{ingredient.name}</p>
      <div className="flex gap-2 items-center">
        {edit ? (
          <>
            <input
              className="w-16"
              type="number"
              value={quant}
              onChange={e => setQuant(Number(e.target.value))}
            />
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
            <div className="flex gap-2 justify-self-end">
              <CancelButton callback={() => setEdit(false)} />
              <SaveButton callback={handleSave}></SaveButton>
            </div>
          </>
        ) : (
          <>
            <p> {`${quant} ${unit}`}</p>
            {editable && (
              <>
                <EditButton callback={() => setEdit(true)} />
                <DeleteButton callback={remove} />
              </>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default EditIngredient;
