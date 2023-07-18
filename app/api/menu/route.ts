import { addRecipeToMenu, removeRecipeFromMenu } from '@/app/api/prisma';
import { NextRequest, NextResponse } from 'next/server';

type GetParams = {
  id: string;
};

export const POST = async (req: NextRequest) => {
  const { id, userId }: { id: string; userId: string } = await req.json();
  console.log('server: ', id, userId);
  await addRecipeToMenu(id, userId);

  return NextResponse.json('OK', {
    status: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
export const DELETE = async (req: NextRequest) => {
  const { id, userId }: { id: string; userId: string } = await req.json();
  await removeRecipeFromMenu(id, userId);

  return NextResponse.json('OK', {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
};
