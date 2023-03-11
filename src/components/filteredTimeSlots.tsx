import React from "react";
// import React from "react";
import styled from "styled-components";
import Timeslots from "./changePageTimes";
// import Checked from "../images/Checked.png";
// import Unchecked from "../images/Unchecked.png";
// import OffSlider from "../images/OffSlider.png";
// import OnSlider from "../images/OnSlider.png";

// import {
//   // Wrapper,
//   // Box,
//   // Button,
//   // Input,
//   // Label,
//   // PasswordContainer,
//   // EyeSlash,
//   // Question,
//   // TextLink,
//   // ErrorMessage,
// } from "./styledComponents";

// const ChevronDown = styled.img`
//   width: auto;
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
//   transform: rotate(270deg);
// `;
// const ChevronUp = styled.img`
//   width: auto;
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
//   transform: rotate(90deg);
// `;
// const StyledBtn = styled.button`
//   border: none;
//   background: none;
//   vertical-align: middle;
// `;

// const Boxes = styled(Box)`
//   border: 0;
//   box-shadow: none;
// `;

// const TimeBox = styled(Box)`
//   white-space: nowrap;
//   text-overflow: clip;
//   border: 0;
//   box-shadow: none;
// `;

// const Boxed = styled(Box)`
//   border: 0;
//   box-shadow: none;

//   /* height: 400px;
//   overflow: scroll; */
// `;

// const ButtonToggle = styled.image`
//   cursor: pointer;
//   align-self: center;
//   scale: 15%;
//   box-shadow: none;
//   height: 40epx;
// `;

// const Row = styled.div`
//   display: flex;
//   flex-direction: row;
//   box-shadow: none;
//   height: 20%;
//   border: solid 0.5px black;
// `;
const Slots = styled.section`
  overflowy: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 5%;
  margin-left: 0%;
`;

interface TimeslotsProps {
  userType: "volunteer" | "rider";
}

const timeslots = [
  {
    startTime: new Date(2023, 2, 7, 9, 0),
    endTime: new Date(2023, 2, 7, 10, 0),
    selected: false,
  },
  {
    startTime: new Date(2023, 2, 7, 10, 0),
    endTime: new Date(2023, 2, 7, 11, 0),
    selected: false,
  },
  {
    startTime: new Date(2023, 2, 7, 11, 0),
    endTime: new Date(2023, 2, 7, 12, 0),
    selected: false,
  },
  {
    startTime: new Date(2023, 2, 7, 12, 0),
    endTime: new Date(2023, 2, 7, 13, 0),
    selected: false,
  },
  {
    startTime: new Date(2023, 2, 7, 13, 0),
    endTime: new Date(2023, 2, 7, 14, 0),
    selected: false,
  },
  {
    startTime: new Date(2023, 2, 7, 14, 0),
    endTime: new Date(2023, 2, 7, 15, 0),
    selected: false,
  },
  {
    startTime: new Date(2023, 2, 7, 15, 0),
    endTime: new Date(2023, 2, 7, 16, 0),
    selected: false,
  },
  {
    startTime: new Date(2023, 2, 7, 16, 0),
    endTime: new Date(2023, 2, 7, 17, 0),
    selected: false,
  },
];

export default function TimeSlot({ userType }: TimeslotsProps) {
  let filteredTimeslots: {
    startTime: Date;
    endTime: Date;
  }[] = [];
  if (userType === "volunteer") {
    // Filter timeslots between 9 AM and 5 PM for volunteers
    filteredTimeslots = timeslots.filter(
      (timeslot) =>
        timeslot.startTime.getHours() >= 9 && timeslot.endTime.getHours() <= 17
    );
  } else if (userType === "rider") {
    // Filter timeslots between 10 AM and 2 PM for riders
    filteredTimeslots = timeslots.filter(
      (timeslot) =>
        timeslot.startTime.getHours() >= 10 && timeslot.endTime.getHours() <= 14
    );
  }

  return (
    <Slots>
      {filteredTimeslots.map((random, index) => (
        <Timeslots
          timeslots={timeslots}
          idx={index}
          // selected={timeslot.selected}
          // idx={index}
        />
      ))}
    </Slots>
  );
}
