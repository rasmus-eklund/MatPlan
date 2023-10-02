import Link from "next/link";
import React, { useState } from "react";
import { addRecipeToMenu } from "../db/menu";
import days from "../db/constants/days";

const DaysDropDown = ({ id, portions }: { id: string; portions: number }) => {
  const [day, setDay] = useState(days.at(-1)!);
  return (
    <div className="flex gap-2">
      <select
        className="rounded-md text-1 bg-4 px-2"
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
          className="rounded-md text-1 bg-4 h-10 px-2"
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
    </div>
  );
};

export default DaysDropDown;
