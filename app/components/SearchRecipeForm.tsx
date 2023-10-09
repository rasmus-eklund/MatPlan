import { Filter, SearchParams } from '@/types';
import { FC, useState } from 'react';

type SearchFormProps = {
  handleSearch: ({ search, filter }: SearchParams) => void;
  onlySearch: boolean;
};

const SearchRecipeForm: FC<SearchFormProps> = ({
  handleSearch,
  onlySearch = false,
}) => {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<Filter>('name');

  return (
    <form
      className="flex flex-col gap-2"
      onSubmit={e => {
        e.preventDefault();
        handleSearch({ filter, search });
      }}
      action=""
    >
      <div className="flex gap-2">
        <input
          className={`bg-4 text-xl px-2 rounded-md h-10 ${
            onlySearch ? 'w-full' : 'w-2/3'
          }`}
          id="search"
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder={'Sök'}
        />
        {!onlySearch && (
          <select
            className="rounded-md bg-4 text-xl h-10 px-2 w-1/3"
            name="filter"
            id="filter"
            value={filter}
            onChange={e => setFilter(e.target.value as Filter)}
          >
            <option value="name">Namn</option>
            <option value="ingredient">Ingredient</option>
            <option value="instruction">Instruktion</option>
          </select>
        )}
      </div>
      {!onlySearch && (
        <button type="submit" className="bg-4 rounded-md text-xl h-10 px-6">
          Sök
        </button>
      )}
    </form>
  );
};

export default SearchRecipeForm;
