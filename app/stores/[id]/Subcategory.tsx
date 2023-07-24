import { SubcategoryItem } from '@/types';
import { useState } from 'react';

type Props = { items: SubcategoryItem };

const Subcategory = ({ items: { category, id, subcategory } }: Props) => {
  const [move, setMove] = useState(false);
  const toggle = () => {
    setMove(!move);
  };
  return (
    <li className="flex gap-5">
      <p onClick={toggle}>{subcategory}</p>
      {move && (
        <div className="flex gap-1">
          <button onClick={() => console.log('upp')}>upp</button>
          <button onClick={() => console.log('down')}>down</button>
        </div>
      )}
    </li>
  );
};

export default Subcategory;
