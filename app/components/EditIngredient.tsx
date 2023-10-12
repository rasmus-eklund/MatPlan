import { Unit } from "@/types";
import { useState, ReactNode } from "react";
import units from "../constants/units";
import DeleteButton from "./buttons/DeleteButton";
import Button from "./buttons/Button";
import EditButton from "./buttons/EditButton";

type EditIngredientProp<T> = {
  ingredientIn: T;
  remove: (ing: T) => void;
  update: (ingredient: T) => void;
  editable: boolean;
  children?: ReactNode;
};

const EditIngredient = <
  T extends { name: string; quantity: number; unit: Unit },
>({
  ingredientIn,
  remove,
  update,
  editable,
  children,
}: EditIngredientProp<T>) => {
  const [ing, setIng] = useState(ingredientIn);
  const [edit, setEdit] = useState(false);

  const handleUpdate = () => {
    update(ing);
    setEdit(false);
  };

  return (
    <li className="flex justify-between items-center bg-4 text-2 rounded-md px-2 py-1">
      <p className="grow">{ing.name}</p>
      <div className="flex gap-2 md:gap-4 items-center">
        {edit ? (
          <>
            <input
              className="w-16"
              type="number"
              value={ing.quantity}
              onChange={(e) =>
                setIng((prev) => ({
                  ...prev,
                  quantity: Number(e.target.value),
                }))
              }
            />
            <select
              id="edit-unit"
              name="unit"
              value={ing.unit}
              onChange={(e) =>
                setIng((prev) => ({ ...prev, unit: e.target.value as Unit }))
              }
            >
              {units.map((u) => (
                <option key={u}>{u}</option>
              ))}
            </select>
            <div className="flex gap-2 justify-self-end">
              <Button name="Avbryt" callback={() => setEdit(false)} />
              <Button name="Spara" callback={handleUpdate} />
            </div>
          </>
        ) : (
          <>
            <p> {`${ing.quantity} ${ing.unit}`}</p>
            {children}
            {editable && (
              <>
                <EditButton callback={() => setEdit(true)} />
                <DeleteButton callback={() => remove(ing)} />
              </>
            )}
          </>
        )}
      </div>
    </li>
  );
};

export default EditIngredient;
