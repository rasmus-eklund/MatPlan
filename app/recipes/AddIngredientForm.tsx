import { Recipe_ingredient, Ingredient } from '@/types';
import { useState } from 'react';
import DeleteButton from '../components/DeleteButton';
import SearchIngredients from '../components/SearchIngredient';

// type Prop = {
//   ingredient: addIngredient;
//   callback: (ing: addIngredient) => void;
// };
type Prop = {
  callback: (ingredient: Recipe_ingredient) => void;
};

const AddIngredientForm = ({ callback }: Prop) => {
  const [ingName, setingName] = useState('');
  const [ingQuan, setIngQuan] = useState(0);
  const [ingUnit, setIngUnit] = useState('');

  const handleSearch = async (name: string) => {
    setingName(name);
  };
  return (
    <div>
      <SearchIngredients callback={handleSearch} />
      <span>{ingName}</span>
      <br></br>
      <label>kvantitet</label>
      <input
        value={ingQuan}
        onChange={e => setIngQuan(Number(e.target.value))}
      />
      <label>Unit</label>
      <input value={ingUnit} onChange={e => setIngUnit(e.target.value)} />
      <button
        onClick={e => {
          e.preventDefault();
          callback({
            ingredientName: ingName,
            quantity: ingQuan,
            unit: ingUnit,
            recipeId: '',
          });
          setingName('');
          setIngQuan(0);
          setIngUnit('');
        }}
      >
        Lägg till
      </button>
    </div>
  );
};

type Prop1 = {
  ing: Recipe_ingredient;
  callback(ing: Recipe_ingredient): void;
};

export const Ingdisplay = ({ ing, callback }: Prop1) => {
  return (
    <div>
      <p>{ing.ingredientName}</p>
      <p>{ing.quantity}</p>
      <p>{ing.unit}</p>
      <DeleteButton
        callback={() => {
          callback(ing);
        }}
      />
    </div>
  );
};

// const AddIngredientForm = ({ ingredient, callback }: Prop) => {
//   const [quanState, setQuanState] = useState(ingredient.quantity);
//   const [unitState, setUnitState] = useState(ingredient.unit);
//   const [editState, setEdiState] = useState(false);

//   const updatedIng: addIngredient = {
//     name: ingredient.name,
//     quantity: quanState,
//     unit: unitState,
//   };

//   if (!editState) {
//     return (
//       <li className="border-2  grid grid-cols-5">
//         <p>{ingredient.name}</p>
//         <p>{ingredient.quantity}</p>
//         <p>{ingredient.unit}</p>
//         <button
//           className="border-2"
//           type="button"
//           onClick={(e) => {
//             e.preventDefault();
//             setEdiState(true);
//           }}
//         >
//           Edit
//         </button>
//         <DeleteButton callback={() => console.log("delete")} />
//       </li>
//     );
//   } else {
//     return (
//       <li className="border-2">
//         <form className="">
//           <p>{ingredient.name}</p>
//           <input
//             id="edit-quantity"
//             type="number"
//             name="quantity"
//             value={quanState}
//             onChange={(e) => setQuanState(Number(e.target.value))}
//           />
//           <select
//             id="edit-unit"
//             name="unit"
//             value={unitState}
//             onChange={(e) => setUnitState(e.target.value)}
//           >
//             {units.map((u) => (
//               <option value={unitState} key={u.abr}>
//                 {u.abr}
//               </option>
//             ))}
//           </select>
//           <button
//             onClick={(e) => {
//               e.preventDefault();
//               callback(updatedIng);
//               setEdiState(false);
//             }}
//           >
//             save
//           </button>
//         </form>
//       </li>
//     );
//   }
// };

export default AddIngredientForm;
