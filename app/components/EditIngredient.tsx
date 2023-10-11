import { RecipeIngredientFront } from '@/types';
import { FC, useState, ReactNode } from 'react';
import units from '../constants/units';
import DeleteButton from './buttons/DeleteButton';
import Button from './buttons/Button';
import EditButton from './buttons/EditButton';

type EditIngredientProp = {
  ingredient: RecipeIngredientFront;
  remove: () => Promise<void>;
  update: (ingredient: RecipeIngredientFront) => Promise<void>;
  editable: boolean;
  children?: ReactNode;
};

const EditIngredient: FC<EditIngredientProp> = ({
  ingredient,
  remove,
  update,
  editable,
  children,
}) => {
  const [unit, setUnit] = useState(ingredient.unit);
  const [quant, setQuant] = useState(ingredient.quantity);
  const [edit, setEdit] = useState(false);

  const handleUpdate = () => {
    update({
      name: ingredient.name,
      quantity: quant,
      unit: unit,
    });
    setEdit(false);
  };

  return (
    <li className="flex justify-between items-center bg-4 text-2 rounded-md px-2 py-1">
      <p className="grow">{ingredient.name}</p>
      <div className="flex gap-2 md:gap-4 items-center">
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
              <Button name="Avbryt" callback={() => setEdit(false)} />
              <Button name="Spara" callback={handleUpdate} />
            </div>
          </>
        ) : (
          <>
            <p> {`${quant} ${unit}`}</p>
            {children}
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
