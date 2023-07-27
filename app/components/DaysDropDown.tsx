import { FullRecipe } from "@/types";
import Link from "next/link";
import React, { useState } from "react";
import { addRecipeToMenu } from "../db/prisma";
import days from "../db/days";

const DaysDropDown = ({ id, portions }: { id: string; portions: number }) => {
  const [day, setDay] = useState(days.at(-1)!);
  return (
    <>
      <select
        className=" p-1.5 px-4 rounded-md m-4 text-1 bg-3"
        name="day"
        id="day"
        value={day}
        onChange={(e) => setDay(e.target.value)}
      >
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </select>
      <Link href={"/recipes"}>
        <button
          className=" p-1.5 px-4 rounded-md m-4 text-1 bg-3"
          onClick={() =>
            addRecipeToMenu({
              id,
              portions,
              day: day,
            })
          }
        >
          Lägg till
        </button>
      </Link>
    </>
  );
};

export default DaysDropDown;
