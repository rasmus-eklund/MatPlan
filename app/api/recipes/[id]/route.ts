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

  return NextResponse.json(recipe);
};
