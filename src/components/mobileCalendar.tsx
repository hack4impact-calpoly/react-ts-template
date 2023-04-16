/* eslint-disable no-param-reassign */
import React, { useState } from "react";
import styled from "styled-components";
import MobileTimeslots from "./mobileTimeslots";
import MobileWeeklyView from "./mobileWeeklyView";
import { Dropdown, Option } from "./Dropdown";
// import caretDown from "../images/CaretDown.png";

// padding-top: 23%;
// display: flex;
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

type UserType = {
  user: string;
  bookings: number;
  day: number;
  setDayProp: (val: number) => void;
};
// setEmail prop that is set in a form in this page
// type SelectedDayProp = {
//   day: number;
//   setDayProp: (val: number) => void;
// };

export default function CalendarMobile({
  user,
  bookings,
  day,
  setDayProp,
}: UserType) {
  const currentTime = new Date();
  // const currentDay = currentTime.getDay();
  // const [selected, setSelected] = useState(currentDay);
  // eslint-disable-next-line no-param-reassign
  user = "volunteer"; // hardcoded for now
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bookings = 1;
  console.log(`the day is ${day}`);
  console.log(`the actual date is ${currentTime.getDate()}`);
  const numSub = currentTime.getDay() - day;
  // converting this to the format in Day, Month Day(num)
  const currentTimeString: string[] = currentTime
    .toDateString()
    .split(" ")
    .slice(0, 2); // replace 2 with 3
  currentTimeString.splice(1, 0, ", ");
  currentTimeString.splice(3, 0, " ");
  currentTimeString.push((currentTime.getDate() - numSub).toString());
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
      {/* i think i need to pass in the day prop to mobile weekly view */}
      <MobileWeeklyView startDate={new Date()} setDayProp={setDayProp} />

      <CurrentDate>{currentTimeString}</CurrentDate>
      {/* <AvailabilityDiv> */}
      <Dropdown onChange={handleSelect}>
        {/* <OptionDiv> */}
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
      <MobileTimeslots userType={user} />
    </div>
  );
}
