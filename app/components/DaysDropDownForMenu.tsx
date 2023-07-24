import React, { useState } from 'react'
import days from '../db/days';
import Link from 'next/link';
import { addRecipeToMenu, changeRecipeDay } from '../db/prisma';

type Props = {}

const DaysDropDownForMenu = ({ id, day }: { id: string; day:DayParams}) => {
        const [dayState, setDayState] = useState<DayParams>
        (day);
        const handleChange =async (recipeId:string, day:DayParams) => {
            await changeRecipeDay(recipeId, day)
        }
        return (
          <>
            <select
              className="border-2 p-1.5 px-4 rounded-md border-black m-4"
              name="day"
              id="day"
              value={day}
              onChange={e => {
                setDayState(e.target.value as string)
                handleChange(id, day)
            }}
            >
              {days.map(day => (
                <option key={day} value={day}>
                  {day}
                </option>
              ))}
            </select>
          </>
        );
      
  return (
    <div>DaysDropDownForMenu</div>
  )
}

export default DaysDropDownForMenu