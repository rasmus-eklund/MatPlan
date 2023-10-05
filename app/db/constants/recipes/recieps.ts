import { RecipeFront } from '@/types';

const defaultRecipes: RecipeFront[] = [
  {
    name: 'Test1',
    portions: 2,
    instruction: 'Test 1',
    recipe_ingredient: [{ name: 'banan', quantity: 1, unit: 'st' }],
    containers: [],
  },
  {
    name: 'Test2',
    portions: 2,
    instruction: 'Test 2',
    recipe_ingredient: [{ name: 'gurka', quantity: 1, unit: 'st' }],
    containers: [],
  },
  {
    name: 'Test3',
    portions: 2,
    instruction: 'Test 3',
    recipe_ingredient: [{ name: 'apelsin', quantity: 1, unit: 'st' }],
    containers: [],
  },
];

export default defaultRecipes;
