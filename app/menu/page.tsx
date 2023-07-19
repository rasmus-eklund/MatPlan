"use client";
import { getMenuItems } from "../db/prisma";
import { Recipe, MenuItem as MenuItemType } from "@/types";
import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

type Props = {};

const page = (props: Props) => {
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  useEffect(() => {
    getMenuItems("Rasmus").then((data) => setMenu(data));
  }, []);
  return (
    <ul>
      {menu.map((r) => (
        <MenuItem recipe={r.recipe} key={r.id} />
      ))}
    </ul>
  );
};

export default page;
