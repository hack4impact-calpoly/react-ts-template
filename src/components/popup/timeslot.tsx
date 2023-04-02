import React, { useState } from "react";
import styled from "styled-components";
import { Box, Description } from "../styledComponents";
import timeslots from "./timeslots";
import Checked from "../../images/Checked.png";
import Unchecked from "../../images/Unchecked.png";
import On from "../../images/onslider.png";
import Off from "../../images/offslider.png";

const Wrapper = styled.section`
  display: flex;
  align-items: left;
  justify-content: center;
  padding: 4%;
  max-height: 600px;
  overflow-y: scroll;
`;

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
  width: max;
`;

const TimeBox = styled(Box)`
  white-space: nowrap;
  text-overflow: clip;
  border: 0;
  box-shadow: none;
  padding: 0;
  width: 100%;
`;

const ButtonToggle = styled.button`
  cursor: pointer;
  outline: none;
  background-color: transparent;
  border: none;
  padding: 0;
  margin: 0px;
`;

const CheckedImg = styled.img`
  width: 70px;
  margin: 0px;
  align-self: left;
`;

const UnCheckedImg = styled.img`
  width: 70px;
  margin: 0px;
  align-self: left;
`;

const OnSliderImg = styled.img`
  width: 80px;
  margin: 0px;
  align-self: left;
`;

const OffSliderImg = styled.img`
  width: 80px;
  margin: 0px;
  align-self: left;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3%;
  border: none;
  width: fit-content;
  block-size: fit-content;
`;

const Slots = styled(Box)`
  //justify content limits view of timeslots
  /* display: flex; */
  flex-direction: column;
  align-items: center;
  // For 100% screen height
  /* width: max; */
  //width: 70vw; /* For 100% screen width */
  border: none;
  box-shadow: none;
  width: 100%;
  height: 100%;
`;
const Slot = styled(Box)`
  /* font-family: "Rubik", sans-serif;
  align-items: center;
  justify-content: center;
  border: 1px solid #c4c4c4;
  /* box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25); */
  /* height: 30vh; /* For 10% screen height */
  /* width: 30vw; /* For 10% screen width */
  display: flex;
  flex-direction: row;
  padding: 3%;
  align-items: left;
  /* border: none; */
  width: 80%;
  // width: fit-content;
  block-size: fit-content;
`;

export default function Timeslot() {
  const [timeSlots, setTimeSlots] = useState(timeslots);

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
        return {
          startTime: timeslot.startTime,
          endTime: timeslot.endTime,
          checked: !timeslot.checked,
        };
      }
      if (volunteer) {
        // The rest haven't changed
        return {
          startTime: timeslot.startTime,
          endTime: timeslot.endTime,
          checked: timeslot.checked,
        };
      }
      // set rest to false to allow rider to set only one time
      return {
        startTime: timeslot.startTime,
        endTime: timeslot.endTime,
        checked: false,
      };
    });
    setTimeSlots(updatedTimeSlots);
  }

  const formatTime = (time: Date) =>
    time.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });
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
      <Slots>
        {timeSlots
          .filter((ts) => filterTimeSlots(showVolunteers, ts))
          .map((timeslot, index) => (
            <Slot>
              {showVolunteers ? (
                <>
                  <ButtonToggle onClick={() => toggleChecked(index, true)}>
                    {showVolunteers && timeslot.checked ? (
                      <CheckedImg src={Checked} alt="Checked Img" />
                    ) : (
                      <UnCheckedImg src={Unchecked} alt="Unchecked Img" />
                    )}
                  </ButtonToggle>
                  <TimeBox>{`${formatTime(timeslot.startTime)} to ${formatTime(
                    timeslot.endTime
                  )}`}</TimeBox>
                </>
              ) : (
                <>
                  <TimeBox>{`${formatTime(timeslot.startTime)} to ${formatTime(
                    timeslot.endTime
                  )}`}</TimeBox>
                  <ButtonToggle onClick={() => toggleChecked(index + 2, false)}>
                    {showRiders && timeslot.checked ? (
                      <OnSliderImg src={On} alt="On Img" />
                    ) : (
                      <OffSliderImg src={Off} alt="Off Img" />
                    )}
                  </ButtonToggle>
                </>
              )}
            </Slot>
          ))}
      </Slots>
    </Wrapper>
  );
}
