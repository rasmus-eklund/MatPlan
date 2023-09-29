import Link from "next/link";
import React, { useState } from "react";
import { addRecipeToMenu } from "../db/menu";
import days from "../db/constants/days";

const DaysDropDown = ({ id, portions }: { id: string; portions: number }) => {
  const [day, setDay] = useState(days.at(-1)!);
  return (
    <>
      <select
        className="rounded-md text-1 bg-4 py-1"
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
          className="rounded-md m-4 text-1 bg-4 px-2 py-1"
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
