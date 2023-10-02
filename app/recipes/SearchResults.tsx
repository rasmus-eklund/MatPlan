import { Recipe } from "@/types";
import Link from "next/link";
import DaysDropDown from "../components/DaysDropDown";
import DeleteButton from "../components/buttons/Delete";

type Props = {
  recipeResult: Recipe[];
  deleteRecipe: (id: string) => Promise<void>;
};

const SearchResults = ({ recipeResult, deleteRecipe }: Props) => {
  return (
    <section className="bg-3 p-2 rounded-md">
      <ul className="flex flex-col gap-2">
        {recipeResult.map((r) => (
          <li
            className="flex justify-between px-2 text-1
             font-bold bg-4 rounded-md  items-center"
            key={r.id}
          >
            <Link href={`/recipes/${r.id}`}>{r.name}</Link>
            <div className="flex items-center gap-4">
              <DaysDropDown id={r.id} portions={r.portions} />
              <DeleteButton callback={() => deleteRecipe(r.id)} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchResults;
