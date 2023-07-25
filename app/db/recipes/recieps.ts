import { RecipeNoId } from '@/types';

const defaultRecipes: RecipeNoId[] = [
  {
    name: 'Raggmunk med fläsk',
    portions: 2,
    ingredients: [
      {
        quantity: 120,
        unit: 'g',
        name: 'vetemjöl',
      },
      {
        quantity: 4,
        unit: 'dl',
        name: 'mjölk',
      },
      {
        quantity: 2,
        unit: 'st',
        name: 'ägg',
      },
      {
        quantity: 0.5,
        unit: 'tsk',
        name: 'salt',
      },
      {
        quantity: 900,
        unit: 'g',
        name: 'potatis',
      },
      {
        quantity: 400,
        unit: 'g',
        name: 'rimmat bogfläsk',
      },
    ],
    instruction:
      'Blanda mjölk, mjöl, ägg och salt.\nSkala och riv potatis. Krama ur vätskan och blanda ned i smeten.\nStek raggmunk och fläsk.',
  },
  {
    name: 'Köttbullar med gräddsås och potatis',
    portions: 4,
    ingredients: [
      {
        quantity: 500,
        unit: 'g',
        name: 'fläskfärs',
      },
      {
        quantity: 1,
        unit: 'st',
        name: 'köttbuljongtärning',
      },
      {
        quantity: 1,
        unit: 'st',
        name: 'lök',
      },
      {
        quantity: 0.5,
        unit: 'tsk',
        name: 'peppar',
      },
      {
        quantity: 8,
        unit: 'st',
        name: 'potatis',
      },
      {
        quantity: 50,
        unit: 'g',
        name: 'smör',
      },
      {
        quantity: 1,
        unit: 'msk',
        name: 'vetemjöl',
      },
      {
        quantity: 3,
        unit: 'dl',
        name: 'grädde',
      },
      {
        quantity: 0.5,
        unit: 'st',
        name: 'köttbuljongtärning',
      },
      {
        quantity: 1,
        unit: 'msk',
        name: 'soja',
      },
      {
        quantity: 2,
        unit: 'tsk',
        name: 'worcestershiresås',
      },
      {
        quantity: 1,
        unit: 'tsk',
        name: 'örtkrydda',
      },
    ],
    instruction:
      'Finhacka löken och blanda med fläskfärsen.\nLös buljongtärningen i lite vatten och blanda i färsen.\nBlanda i peppar. Skala och koka potatis. Smält smör i en kastrull och fortsätt fräsa under ständig omrörning tills det är gyllenbrunt och doftar nötigt.\nVispa ner mjöl och lite av grädden till en tjock stuvning. Tillsätt resterande grädde, lite i taget, under vispning. Tillsätt örtkryddor (och ev steksky).\nLåt sjuda på låg värme minst 10 min men gärna längre. Rör då och då. Tillsätt smulad buljongtärning, soja, och worcestersås. Låt koka ytterligare 5 min. Smaka av med salt och peppar.\n',
  },
];

export default defaultRecipes;
