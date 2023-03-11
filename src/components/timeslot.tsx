import React, { useState } from "react";
// import React from "react";
import styled from "styled-components";
import timeslots from "./timeslots";
import Checked from "../images/Checked.png";
import Unchecked from "../images/Unchecked.png";

import {
  Wrapper,
  Box,
  Button,
  // Input,
  // Label,
  // PasswordContainer,
  // EyeSlash,
  // Question,
  // TextLink,
  // ErrorMessage,
} from "./styledComponents";

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

const Boxed = styled(Box)``;

const ButtonToggle = styled(Button)`
  cursor: pointer;
  scale: 25%;
  margin-top: -5%;
  margin-left: -6%;
  outline: none;
  background-color: white;
  border: none;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3%;
`;

export default function Timeslot() {
  const [timeSlots, setTimeSlots] = useState(timeslots);
  // const [checkMark, setCheckMark] = useState(false);
  // const [showChecked, setshowChecked] = useState(false);
  // // const [showUnchecked, setshowUnchecked] = useState(false);

  // const toggleChecked = (
  //   timeslot: { time: string; checked: boolean },
  //   index: number
  // ) => {
  //   // When the handler is invoked
  //   // inverse the boolean state of passwordShown
  //   timeslots[index].checked = !timeslots[index].checked;
  //   setTimeSlots(timeslots);
  //   // setCheckMark(timeslot.checked);
  //   // setUpdateCheck(!timeslot.checked);
  // };

  function toggleChecked(index: number) {
    const updatedTimeSlots = timeSlots.map((timeslot, i) => {
      if (i === index) {
        // Increment the clicked counter;
        return { time: timeslot.time, checked: !timeslot.checked };
      }
      // The rest haven't changed
      return { time: timeslot.time, checked: timeslot.checked };
    });
    // delete timeslots[index];
    // // const newTime :timeslotsType = {timeslots[index].time, updatedTimeSlot};
    // timeslots.splice(index, );
    // delete timeslots[index];
    // timeslots.splice(index, {timeslots[index].time, updatedTimeSlot});
    setTimeSlots(updatedTimeSlots);
  }

  // const [dropdownShown0, setDropdownShown0] = useState(false);

  return (
    <Wrapper>
      <Boxed>
        {timeSlots.map((timeslot, index) => (
          <Row>
            <Box>
              {/* {setCheckMark(false)} */}
              <ButtonToggle onClick={() => toggleChecked(index)}>
                {timeslot.checked ? (
                  <img src={Checked} alt="Checked Img" />
                ) : (
                  <img src={Unchecked} alt="Unchecked Img" />
                )}
              </ButtonToggle>
            </Box>
            <Box>{timeslot.time}</Box>
          </Row>
        ))}
      </Boxed>
    </Wrapper>
  );
}
