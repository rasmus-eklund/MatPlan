import { NextResponse, NextRequest } from 'next/server';
import {
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
} from '@/app/api/prisma';

export const GET = async (req: NextRequest) => {
  let data;
  const urlParams = new URLSearchParams(req.url!.split('?')[1]);
  const q = urlParams.get('q');
  const filter = urlParams.get('filter');

  if (
    q === null ||
    !['name', 'ingredients', 'instruction'].some(i => i === filter)
  ) {
    return NextResponse.json(
      {
        message: 'missing queries!',
      },
      {
        status: 400,
      }
    );
  }
  switch (filter) {
    case 'ingredients':
      data = await getRecipeByIngredient(q);
      break;

    case 'name':
      data = await getRecipeByName(q);
      break;

    case 'instruction':
      data = await getRecipeByInstructions(q);
      break;

    default:
      break;
  }
  return NextResponse.json(data);
};
