import { Day, RecipeSearch } from "@/types";
import Link from "next/link";
import DaysDropDown from "../DaysDropDown";
import { addRecipeToMenu } from "../../db/menu";

type Props = {
  recipeResult: RecipeSearch[];
};

const FoundRecipes = ({ recipeResult }: Props) => {
  const addRecipe = (day: Day, id: string, portions: number) => {
    addRecipeToMenu({ day, id, portions });
  };
  return (
    <section className="flex flex-col bg-3 p-2 gap-2 rounded-md">
      <h2 className="text-xl text-1">Recept:</h2>
      <ul className="flex flex-col gap-2">
        {recipeResult.map((r) => (
          <li
            className="flex justify-between px-2 py-1 text-1
             font-bold bg-4 rounded-md  items-center"
            key={r.id}
          >
            <Link href={`/recipes/${r.id}`}>{r.name}</Link>
            <div className="flex items-center gap-4">
              <DaysDropDown
                initDay="Obestämd"
                setDay={(day) => addRecipe(day, r.id, r.portions)}
              />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default FoundRecipes;
