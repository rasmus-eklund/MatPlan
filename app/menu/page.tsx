"use client";
import { getMenuItems } from "../db/prisma";
import { Recipe, MenuItem as MenuItemType } from "@/types";
import React, { useEffect, useState } from "react";
import MenuItem from "./MenuItem";

type Props = {};

const Menu = (props: Props) => {
  const [menu, setMenu] = useState<MenuItemType[]>([]);

  useEffect(() => {
    getMenuItems("jarjar.jarsson@gmail.com").then((data) => setMenu(data));
  }, []);
  return (
    <>
      <ul>
        <li>Måndag</li>
        <li>Tisdag</li>
        <li>Onsdag</li>
        <li>Torsdag</li>
        <li>Fredag</li>
        <li>Lördag</li>
        <li>Söndag</li>
      </ul>

      <ul>
        {menu.map((r) => (
          <MenuItem recipe={r.recipe} key={r.id} />
        ))}
      </ul>
    </>
  );
};

export default Menu;
