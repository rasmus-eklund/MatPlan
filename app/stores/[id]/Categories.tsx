import { SubcategoryItem } from '@/types';

type Props = {
  categories: { name: string; id: string }[];
};

const Category = ({ categories }: Props) => {
  return (
    <ul>
      {categories.map(c => (
        <li key={c.name + c.id}>{c.name}</li>
      ))}
    </ul>
  );
};

export default Category;
