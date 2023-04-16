/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import styled from "styled-components";
import MobileTimeslots from "./mobileTimeslots";
import MobileWeeklyView from "./mobileWeeklyView";
import { Dropdown, Option } from "./Dropdown";

const CurrentDate = styled.text`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  margin-left: 12%;
  color: #1b4c5a;
  display: flex;
  margin-top: 20%;
`;

// props used in mobileweeklyview as well
type UserType = {
  user: string;
  bookings: number;
  day: string;
  setDayProp: (val: string) => void;
  month: string;
  setMonthProp: (val: string) => void;
  weekday: string;
  setWeekdayProp: (val: string) => void;
};

export default function CalendarMobile({
  user,
  bookings,
  day,
  setDayProp,
  month,
  setMonthProp,
  weekday,
  setWeekdayProp,
}: UserType) {
  // these values are hardcoded for conditional rendering of showing different slots
  // eslint-disable-next-line no-param-reassign
  user = "volunteer"; // hardcoded for now
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bookings = 1;

  // this is to create the current selected date string
  const currentTimeString: string[] = [];
  currentTimeString.push(weekday);
  currentTimeString.push(", ");
  currentTimeString.push(month);
  currentTimeString.push(" ");
  currentTimeString.push(day);

  // this is for the toggle dropdown
  const [optionValue, setOptionValue] = useState("");
  const handleSelect = (e: {
    target: { value: React.SetStateAction<string> };
  }) => {
    console.log(e.target.value);
    console.log(optionValue);
    setOptionValue(e.target.value);
  };

  return (
    <div>
      {/* renders the calendar  */}
      <MobileWeeklyView
        startDate={new Date()}
        setDayProp={setDayProp}
        setMonthProp={setMonthProp}
        setWeekdayProp={setWeekdayProp}
      />
      {/* creates the current selected date */}
      <CurrentDate>{currentTimeString}</CurrentDate>
      {/* this is for the toggle dropdown with different options on different user types */}
      <Dropdown onChange={handleSelect}>
        <Option selected value={user === "admin" ? "Both" : "Availability"} />
        <Option
          value={user !== "admin" ? "My Slots" : "Riders"}
          selected={undefined}
        />

        {user === "admin" ? (
          <Option value="Volunteers" selected={undefined} />
        ) : (
          <div>0</div>
        )}
      </Dropdown>
      {/* the timeslots will change depending on the usertype */}
      <MobileTimeslots userType={user} />
    </div>
  );
}
