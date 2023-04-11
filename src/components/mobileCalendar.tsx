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
};

// const AvailText = styled.div``;
// figure out how to get the date to show up above the slots.
// work on functionality for clicking a date so it shows up.
// maybe connect the props from MobileTimeslots and MobileTimeslotContent
export default function CalendarMobile({ user, bookings }: UserType) {
  const currentTime = new Date();
  // eslint-disable-next-line no-param-reassign
  user = "volunteer"; // hardcoded for now
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  bookings = 1;

  // converting this to the format in Day, Month Day(num)
  const currentTimeString: string[] = currentTime
    .toDateString()
    .split(" ")
    .slice(0, 3);
  currentTimeString.splice(1, 0, ", ");
  currentTimeString.splice(3, 0, " ");
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
      <MobileWeeklyView startDate={new Date()} />

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
