import { NextResponse, NextRequest } from "next/server";
import { NextApiRequest } from "next";
import {
  getRecipeByIngredient,
  getRecipeByInstructions,
  getRecipeByName,
} from "@/app/recipes/prisma";

export const GET = async (req: NextApiRequest) => {
  let data;
  const urlParams = new URLSearchParams(req.url!.split("?")[1]);
  const q = urlParams.get("q");
  const filter = urlParams.get("filter");

  if (
    q === null ||
    !["name", "ingredients", "instruction"].some((i) => i === filter)
  ) {
    console.log("wrong very wrong");
    return NextResponse.json(
      {
        message: "missing queries!",
      },
      {
        status: 400,
      }
    );
  }
  console.log("here is q: ", q);
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
  return NextResponse.json(data);
};
