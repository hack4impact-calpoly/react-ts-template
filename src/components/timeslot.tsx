import React, { useState } from "react";
// import React from "react";
import styled from "styled-components";
import { Wrapper, Box, Button, Description } from "./styledComponents";
import timeslots from "./timeslots";
import Checked from "../images/Checked.png";
import Unchecked from "../images/Unchecked.png";
import On from "../images/OnSlider.png";
import Off from "../images/OffSlider.png";

const CheckBox = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 2px #1b4c5a;
  padding: 3%;
  padding-right: 3%;
  padding-left: 3%;
  width: 5%;
`;
const Check = styled.div`
  border-radius: 5px;
  border: solid 0.5px #c4c4c4;
  background-color: #1b4c5a;
  height: 10%;
  width: 10%;
  padding: 70%;
`;

const NotCheck = styled.div`
  border-radius: 5px;
  background-color: white;
  height: 10%;
  width: 10%;
  padding: 70%;
`;

const ViewingDescription = styled(Description)`
  font-family: "Roboto";
  padding-left: 3%;
  font-size: 100%;
  padding-top: 4%;
`;

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
  // let filteredTimeslots: { time: String }[] = [];
  // if (userType === "volunteer") {
  //   // Filter timeslots between 9 AM and 5 PM for volunteers
  //   filteredTimeslots = timeslots.filter(
  //     (timeslot) =>
  //       timeslot.startTime.getHours() >= 9 && timeslot.endTime.getHours() <= 17
  //   );
  // } else if (userType === "rider") {
  //   // Filter timeslots between 10 AM and 2 PM for riders
  //   filteredTimeslots = timeslots.filter(
  //     (timeslot) =>
  //       timeslot.startTime.getHours() >= 10 && timeslot.endTime.getHours() <= 14
  //   );
  // }

  const [showVolunteers, setShowVolunteers] = useState(false);
  const [showRiders, setShowRiders] = useState(false);
  const toggleVolunteer = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setShowVolunteers(!showVolunteers);
    setShowRiders(false);
  };
  const toggleRider = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setShowRiders(!showRiders);
    setShowVolunteers(false);
  };

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
  function filterTimeSlots(
    isVolunteers: boolean,
    ts: {
      startTime: Date;
      endTime: Date;
      checked: boolean;
    }
  ) {
    if (isVolunteers) {
      return ts.startTime.getHours() >= 9 && ts.endTime.getHours() <= 17;
    }
    return ts.startTime.getHours() >= 10 && ts.endTime.getHours() <= 14;
  }
  function toggleChecked(index: number, volunteer: boolean) {
    const updatedTimeSlots = timeSlots.map((timeslot, i) => {
      if (i === index) {
        // Increment the clicked counter;
        return { time: timeslot.time, checked: !timeslot.checked };
      }
      if (userType === "volunteer") {
        // The rest haven't changed
        return { time: timeslot.time, checked: timeslot.checked };
      }
      // set rest to false to allow rider to set only one time
      return { time: timeslot.time, checked: false };
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
      <Row>
        <CheckBox onClick={toggleVolunteer}>
          {showVolunteers ? <Check /> : <NotCheck />}
        </CheckBox>
        <ViewingDescription>Volunteer only</ViewingDescription>
      </Row>
      <Row>
        <CheckBox onClick={toggleRider}>
          {showRiders ? <Check /> : <NotCheck />}
        </CheckBox>
        <ViewingDescription>Rider only</ViewingDescription>
      </Row>
      <Boxed>
        {timeSlots
          .filter((ts) => filterTimeSlots(showVolunteers, ts))
          .map((timeslot, index) => (
            <Row>
              <Box>
                {showVolunteers ? (
                  <ButtonToggle onClick={() => toggleChecked(index, true)}>
                    {showVolunteers && timeslot.checked ? (
                      <img src={Checked} alt="Checked Img" />
                    ) : (
                      <img src={Unchecked} alt="Unchecked Img" />
                    )}
                  </ButtonToggle>
                ) : (
                  <ButtonToggle onClick={() => toggleChecked(index, false)}>
                    {showRiders && timeslot.checked ? (
                      <img src={On} alt="On Img" />
                    ) : (
                      <img src={Off} alt="Off Img" />
                    )}
                  </ButtonToggle>
                )}
                <Box>{`${formatTime(timeslot.startTime)} to ${formatTime(
                  timeslot.endTime
                )}`}</Box>
              </Box>
            </Row>
          ))}
      </Boxed>
    </Wrapper>
  );
}
