import { Store } from '@/types';

type Props = {
  stores: Store[];
  callback: (id: string) => void;
};

const SelectStore = ({ stores, callback }: Props) => {
  return (
    <select
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
