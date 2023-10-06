import { RecipeFront } from '@/types';

const defaultRecipes: RecipeFront[] = [
  {
    name: 'Test1',
    portions: 2,
    instruction: 'Test 1',
    ingredients: [{ name: 'banan', quantity: 1, unit: 'st' }],
  },
  {
    name: 'Test2',
    portions: 2,
    instruction: 'Test 2',
    ingredients: [{ name: 'gurka', quantity: 1, unit: 'st' }],
  },
  {
    name: 'Test3',
    portions: 2,
    instruction: 'Test 3',
    ingredients: [{ name: 'apelsin', quantity: 1, unit: 'st' }],
  },
];

export default defaultRecipes;
