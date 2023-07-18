import { getRecipeById } from '@/app/api/prisma';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
  id: string;
};

export const GET = async (
  _req: NextRequest,
  context: { params: GetParams }
) => {
  const { id } = context.params;
  console.log(id);
  const recipe = await getRecipeById(id);
  console.log(recipe);

  return NextResponse.json(recipe, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
