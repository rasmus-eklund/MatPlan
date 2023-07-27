import { StorePrisma } from '@/types';

type Props = {
  stores: StorePrisma[];
  callback: (id: string) => void;
};

const SelectStore = ({ stores, callback }: Props) => {
  return (
    <select
      className='bg-4 rounded-md px-2'
      name="store"
      id="store_select"
      onChange={e => callback(e.target.value)}
    >
      {stores.map(({ name, id }) => (
        <option key={id} value={id}>
          {name}
        </option>
      ))}
    </select>
  );
};

export default SelectStore;
