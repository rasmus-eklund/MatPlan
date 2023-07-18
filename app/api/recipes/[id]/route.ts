import { getRecipeById } from "@/app/recipes/prisma";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";

type GetParams = {
  id: string;
};

export const GET = async (
  req: NextApiRequest,
  context: { params: GetParams }
) => {
  const { id } = context.params;
  console.log(id);
  const recipe = await getRecipeById(id);
  console.log(recipe);

  return NextResponse.json(recipe);
};
