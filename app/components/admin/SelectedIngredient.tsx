import { capitalize } from "@/app/utils/utils";
import DeleteButton from "../buttons/DeleteButton";
import { deleteIngredient, updateIngredient } from "@/app/server-side/admin";
import { FC } from "react";
import Button from "../buttons/Button";
import { Category, IngredientCat, Subcategory } from "@/types";
import { getIngCatSub } from "./utils";

type SelectedIngredientProps = {
  ingredient: IngredientCat;
  edited: IngredientCat;
  cat: Category[];
  sub: Subcategory[];
  update: (ing?: IngredientCat) => void;
};
const SelectedIngredient: FC<SelectedIngredientProps> = ({
  ingredient,
  edited,
  cat,
  sub,
  update,
}) => {
  const handleDelete = async (name: string) => {
    await deleteIngredient(name);
    update();
  };
  const handleChangeCategory = async (edited: IngredientCat) => {
    const ing = await updateIngredient(edited);
    update(ing);
  };
  const { name, category, subcategory } = getIngCatSub(ingredient, cat, sub);
  const { category: eCat, subcategory: eSub } = getIngCatSub(edited, cat, sub);
  const differentCat = category !== eCat;
  const differentSub = subcategory !== eSub;
  return (
    <section>
      <div className="flex flex-col gap-2 bg-c3">
        <p className="text-xl">{capitalize(name)}</p>
        <div className="flex gap-2">
          <p>{capitalize(category)}</p>
          {differentCat && <p>{` ---> ${eCat}`}</p>}
        </div>
        <div className="flex gap-2">
          <p>{capitalize(subcategory)}</p>
          {differentSub && <p>{` ---> ${eSub}`}</p>}
        </div>
        <DeleteButton callback={() => handleDelete(ingredient.name)} />
        {(differentCat || differentSub) && (
          <Button
            name="Spara ändring"
            callback={() => handleChangeCategory(edited)}
          />
        )}
      </div>
    </section>
  );
};

export default SelectedIngredient;
