import { Recipe } from "@/types";
import Link from "next/link";
import DaysDropDown from "../components/DaysDropDown";
import DeleteButton from "../components/DeleteButton";

type Props = {
  recipeResult: Recipe[];
  deleteRecipe: (id: string) => Promise<void>;
};

const SearchResults = ({ recipeResult, deleteRecipe }: Props) => {
  return (
    <section className="bg-3 px-4 py-4 rounded-lg">
      <ul className="flex flex-col gap-4">
        {recipeResult.map((r) => (
          <li
            className="flex justify-between px-4 text-1
             font-bold bg-4 rounded-md  items-center"
            key={r.id}
          >
            <Link href={`/recipes/${r.id}`}>{r.name}</Link>
            <div>
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
