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
    <section>
      <ul>
        {recipeResult.map((r) => (
          <li className="flex justify-between px-4 border-4 border-3 text-2 font-bold bg-3 rounded-md border-black m-2 items-center" key={r.id}>
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
