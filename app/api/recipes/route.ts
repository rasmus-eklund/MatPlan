import prisma from '@/db/prisma';
import { NextResponse, NextRequest } from 'next/server';
import { NextApiRequest } from 'next';

export const GET = async (req: NextApiRequest) => {
  const recipes = await prisma.public_recipe.findMany();
  return NextResponse.json(recipes);
};

