import { RecipeSearch } from '@/types';
import Link from 'next/link';
import DaysDropDown from '../components/DaysDropDown';

type Props = {
  recipeResult: RecipeSearch[];
};

const SearchResults = ({ recipeResult }: Props) => {
  return (
    <section className="flex flex-col bg-3 p-2 gap-2 rounded-md">
      <h2 className="text-xl text-1">Recept:</h2>
      <ul className="flex flex-col gap-2">
        {recipeResult.map(r => (
          <li
            className="flex justify-between px-2 text-1
             font-bold bg-4 rounded-md  items-center"
            key={r.id}
          >
            <Link href={`/recipes/${r.id}`}>{r.name}</Link>
            <div className="flex items-center gap-4">
              <DaysDropDown id={r.id} portions={r.portions} />
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default SearchResults;
