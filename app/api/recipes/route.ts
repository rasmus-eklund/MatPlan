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
      data = await getRecipeByIngredient(q, 'Rasmus');
      break;

    case 'name':
      data = await getRecipeByName(q, 'Rasmus');
      break;

    case 'instruction':
      data = await getRecipeByInstructions(q, 'Rasmus');
      break;

    default:
      break;
  }
  return NextResponse.json(data, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
