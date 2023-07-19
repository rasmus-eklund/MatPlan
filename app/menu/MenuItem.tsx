import { Recipe } from "@/types";
import React from "react";

const MenuItem = ({ recipe }: { recipe: Recipe }) => {
  return (
    <li>
      <p>{recipe.name}</p>
      <button>-</button>
      <p>{recipe.portions}</p>
      <button>+</button>
    </li>
  );
};

export default MenuItem;
