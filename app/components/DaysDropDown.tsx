import { FC, useState } from 'react';
import type { Day } from '@/types';
import days from '../constants/days';

type DaysDropDownProp = {
  callback: (day: Day) => void;
  initDay: Day;
};

const DaysDropDown: FC<DaysDropDownProp> = ({ callback, initDay }) => {
  const [day, setDay] = useState(initDay);

  return (
    <select
      className="rounded-md text-1 bg-4 h-10 px-2 hover:bg-3 hover:text-4"
      value={day}
      onChange={e => {
        setDay(e.target.value as Day);
        callback(e.target.value as Day);
      }}
    >
      {days.map((day, i) => (
        <option key={day + i} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};

export default DaysDropDown;
