import { SubcategoryItem } from '@/types';

type Props = { items: SubcategoryItem[] };

const Subcategory = ({ items }: Props) => {
  return (
    <ul>
      {items.map(i => (
        <li key={i.name}>{i.name}</li>
      ))}
    </ul>
  );
};

export default Subcategory;
