/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import React, { useState } from "react";

interface ICalendarWeekProps {
  startDate: Date;
}

const CalendarWeek: React.FC<ICalendarWeekProps> = ({ startDate }) => {
  const [currentDate, setCurrentDate] = useState(startDate);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000));
  }

  const hours = Array.from({ length: 24 }, (_, i) => i);

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  return (
    <div>
      <table style={{ border: "1px solid black" }}>
        <thead>
          <tr>
            <th />
            {days.map((day) => (
              <th key={day.toDateString()}>{day.toDateString()}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <td>{`${hour}:00`}</td>
              {days.map((day) => (
                <td key={`${day.toDateString()}-${hour}`} />
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handlePrevWeek}>Previous Week</button>
      <button onClick={handleNextWeek}>Next Week</button>
    </div>
  );
};

export default CalendarWeek;
