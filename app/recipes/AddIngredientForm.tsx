import { addIngredient } from '@/types';
import { useState } from 'react';

const AddIngredientForm = () => {
  const data = localStorage.getItem('ingList') as string;
  const currentList = JSON.parse(data);

  const [name, setName] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(0);
  const [unit, setUnit] = useState<string>('');
  const [ingList, setIngList] = useState<addIngredient[]>([]);

  return (
    <>
      <div>
        <label>Ingredient Name:</label>
        <input
          type="text"
          value={name}
          onChange={e => {
            setName(e.target.value);
          }}
        />
        <label>Quantity:</label>
        <input
          type="number"
          value={quantity}
          onChange={e => setQuantity(parseInt(e.target.value))}
        />
        <label>Unit:</label>
        <input
          type="text"
          value={unit}
          onChange={e => setUnit(e.target.value)}
        />
        <button
          onClick={e => {
            e.preventDefault();
            setIngList([...ingList, { name, quantity, unit }]);
            localStorage.setItem('ingList', JSON.stringify(ingList));
            setName('');
            setQuantity(0);
            setUnit('');
          }}
        >
          Add
        </button>
      </div>
    </>
  );
};

export default AddIngredientForm;
