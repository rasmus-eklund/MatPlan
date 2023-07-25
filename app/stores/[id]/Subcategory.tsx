import { SubcategoryItem } from '@/types';
import { useState } from 'react';

type Props = {
  items: SubcategoryItem;
  index: number;
  clicked: (direction: 'up' | 'down', index: number) => void;
};

const Subcategory = ({
  items: { category, id, subcategory },
  index,
  clicked,
}: Props) => {
  const [move, setMove] = useState(false);
  const toggle = () => {
    setMove(!move);
  };
  return (
    <li className="flex gap-5 border-2 border-black rounded-3xl m-2 p-1 font-semibold mr-4 ml-4">
      <p className="ml-2 flex-grow " onClick={toggle}>
        {subcategory}
      </p>
      {move && (
        <div className="flex gap-1">
          <button onClick={() => clicked('up', index)}>upp</button>
          <button className="mr-2" onClick={() => clicked('down', index)}>
            ned
          </button>
        </div>
      )}
    </li>
  );
};

export default Subcategory;
