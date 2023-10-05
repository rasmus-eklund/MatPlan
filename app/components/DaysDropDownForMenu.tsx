import { FC, useState } from 'react';
import days from '../db/constants/days';

type DaysDropDownForMenuProp = {
  callback: (day: string) => void;
  initDay: string;
};

const DaysDropDownForMenu: FC<DaysDropDownForMenuProp> = ({
  callback,
  initDay,
}) => {
  const [day, setDay] = useState(initDay);
  return (
    <select
      className="rounded-md bg-3 p-1"
      name="day"
      id="day"
      value={day}
      onChange={e => {
        setDay(e.target.value);
        callback(e.target.value);
      }}
    >
      {days.map(day => (
        <option key={day} value={day}>
          {day}
        </option>
      ))}
    </select>
  );
};

export default DaysDropDownForMenu;
