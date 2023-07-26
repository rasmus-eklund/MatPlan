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
          <li className="flex border-2 rounded-md border-black m-4" key={r.id}>
            <Link href={`/recipes/${r.id}`}>{r.name}</Link>
            <DaysDropDown id={r.id} portions={r.portions} />
            <DeleteButton callback={() => deleteRecipe(r.id)} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchResults;
