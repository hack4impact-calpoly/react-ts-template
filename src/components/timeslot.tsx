import React, { useState } from "react";
// import React from "react";
import styled from "styled-components";
import timeslots from "./timeslots";
import Checked from "../images/Checked.png";
import Unchecked from "../images/Unchecked.png";
import OffSlider from "../images/OffSlider.png";
import OnSlider from "../images/OnSlider.png";

import {
  Wrapper,
  Box,
  // Button,
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

const CheckBox = styled.div`
  border: solid 2px #1b4c5a;
  scale: 25%;
`;

const Boxes = styled(Box)`
  border: 0;
  box-shadow: none;
`;

const TimeBox = styled(Box)`
  white-space: nowrap;
  text-overflow: clip;
  border: 0;
  box-shadow: none;
`;

const Boxed = styled(Box)`
  border: 0;
  box-shadow: none;

  /* height: 400px;
  overflow: scroll; */
`;

const ButtonToggle = styled.image`
  cursor: pointer;
  align-self: center;
  scale: 25%;
  box-shadow: none;
  height: 40epx;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  box-shadow: none;
  height: 20%;
  border: solid 0.5px black;
`;

export default function Timeslot() {
  const [timeSlots, setTimeSlots] = useState(timeslots);

  const [volunteerView, setVolunteerView] = useState(false);
  const [riderView, setRiderView] = useState(false);

  function toggleChecked(index: number) {
    const updatedTimeSlots = timeSlots.map((timeslot, i) => {
      if (i === index) {
        // Increment the clicked counter;
        return { time: timeslot.time, checked: !timeslot.checked };
      }
      // The rest haven't changed
      return { time: timeslot.time, checked: timeslot.checked };
    });
    setTimeSlots(updatedTimeSlots);
  }

  function toggleSlider(index: number) {
    const updatedTimeSlots = timeSlots.map((timeslot, i) => {
      if (i === index) {
        // Increment the clicked counter;
        return { time: timeslot.time, checked: !timeslot.checked };
      }
      // The rest haven't changed
      return { time: timeslot.time, checked: timeslot.checked };
    });
    setTimeSlots(updatedTimeSlots);
  }

  const toggleVolunteer = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setVolunteerView(!volunteerView);
    setRiderView(false);
  };
  const toggleRider = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setRiderView(!riderView);
    setVolunteerView(false);
  };

  return (
    <Wrapper>
      <Boxed>
        {timeSlots.map((timeslot, index) => (
          <Row>
            <Boxes>
              <CheckBox onClick={toggleVolunteer}>
                <ButtonToggle onClick={() => toggleChecked(index)}>
                  {timeslot.checked ? (
                    <img src={Checked} alt="Checked Img" />
                  ) : (
                    <img src={Unchecked} alt="Unchecked Img" />
                  )}
                </ButtonToggle>
              </CheckBox>
              <CheckBox onClick={toggleRider}>
                <ButtonToggle onClick={() => toggleSlider(index)}>
                  {timeslot.checked ? (
                    <img src={OnSlider} alt="On Slider img" />
                  ) : (
                    <img src={OffSlider} alt="Off Slider Img" />
                  )}
                </ButtonToggle>
              </CheckBox>
            </Boxes>
            <TimeBox>{timeslot.time}</TimeBox>
          </Row>
        ))}
      </Boxed>
    </Wrapper>
  );
}
