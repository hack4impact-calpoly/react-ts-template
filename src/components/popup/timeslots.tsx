import React from "react";
import styled from "styled-components";
// import { Box } from "../styledComponents";
import Timeslot from "./timeslot";
import { LazyTimeslot } from "../../models";

const Wrapper = styled.section`
  display: flex;
  align-items: left;
  width: 100%;
  max-height: 400px;
  overflow-y: scroll;
`;

const Slots = styled.div`
  //justify content limits view of timeslots
  /* display: flex; */
  flex-direction: column;
  border: none;
  box-shadow: none;
  width: 100%;
  height: 100%;
  font-family: "Rubik", sans-serif;
`;

interface TsData {
  startTime: Date;
  endTime: Date;
  checked: false;
  id: string;
}

interface TimeslotsProps {
  userType: string;
  models: LazyTimeslot[] | "nothing";
  date: Date;
}

export default function Timeslots({ userType, models, date }: TimeslotsProps) {
  console.log(date);
  console.log(models);
  const timeslots: TsData[] = [];
  if (models !== "nothing") {
    models.forEach((model) => {
      if (
        typeof model.startTime === "string" &&
        typeof model.endTime === "string"
      ) {
        timeslots.push({
          startTime: new Date(`July 4 1776 ${model.startTime}`),
          endTime: new Date(`July 4 1776 ${model.endTime}`),
          checked: false,
          id: model.id,
        });
      }
    });
    // console.log(timeslots);
  }
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

  return (
    <Wrapper>
      <Slots>
        {timeslots
          .filter((ts) => filterTimeSlots(userType === "Volunteer", ts))
          .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
          .map((timeslot) => (
            <Timeslot
              userType={userType}
              startTime={timeslot.startTime}
              endTime={timeslot.endTime}
              tsId={timeslot.id}
            />
          ))}
      </Slots>
    </Wrapper>
  );
}
