import { CategoryItem } from '@/types';
import { useState } from 'react';
import Subcategory from './Subcategory';

type Props = {
  category: CategoryItem;
};

const Category = ({ category: { category, order } }: Props) => {
  const [subOrder, setSubOrder] = useState(order);
  return (
    <ul>
      <h2 className='text-2xl underline'>{category}</h2>
      {order.map(i => (
        <Subcategory key={i.id} items={i} />
      ))}
    </ul>
  );
};

export default Category;
