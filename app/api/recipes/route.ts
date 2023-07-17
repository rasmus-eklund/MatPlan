import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest } from "next";
import {
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
} from "@/app/recipes/prisma";
import { FilterParams, SearchRecipeParams } from "@/types";
import { searchForWorkspaceRoot } from "vite";

type GetParams = {
  q: string;
  filter: FilterParams;
};

export const GET = async (
  req: NextApiRequest,
  context: { params: GetParams }
) => {
  let data;
  const urlParams = new URLSearchParams(req.url!.split("?")[1]);
  const q = urlParams.get("q");
  const filter = urlParams.get("filter");
  console.log(q, filter);
  if (!q || !filter) {
    return NextResponse.json(
      {
        message: "missing queries!",
      },
      {
        status: 400,
      }
    );
  }
  switch (filter) {
    case "ingredients":
      data = await getRecipeByIngredient(q);

      break;

    case "name":
      data = await getRecipeByName(q);
      break;

    case "instruction":
      data = await getRecipeByInstructions(q);
      break;

    default:
      break;
  }
  console.log(data);
  return NextResponse.json(data);
};
