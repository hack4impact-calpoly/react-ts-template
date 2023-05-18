import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../userContext";
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

let timeslots = [
  {
    startTime: new Date(2023, 2, 7, 9, 0),
    endTime: new Date(2023, 2, 7, 10, 30),
    checked: false,
  },
  {
    startTime: new Date(2023, 2, 7, 9, 30),
    endTime: new Date(2023, 2, 7, 10, 0),
    checked: false,
  },
  {
    startTime: new Date(2023, 2, 7, 10, 0),
    endTime: new Date(2023, 2, 7, 10, 30),
    checked: false,
  },
  {
    startTime: new Date(2023, 2, 7, 10, 35),
    endTime: new Date(2023, 2, 7, 11, 5),
    checked: false,
  },
  {
    startTime: new Date(2023, 2, 7, 13, 0),
    endTime: new Date(2023, 2, 7, 14, 0),
    checked: false,
  },
  {
    startTime: new Date(2023, 2, 7, 14, 0),
    endTime: new Date(2023, 2, 7, 15, 0),
    checked: false,
  },
  {
    startTime: new Date(2023, 2, 7, 15, 0),
    endTime: new Date(2023, 2, 7, 16, 0),
    checked: false,
  },
  {
    startTime: new Date(2023, 2, 7, 16, 0),
    endTime: new Date(2023, 2, 7, 17, 0),
    checked: false,
  },
];

interface TimeslotsProps {
  models: LazyTimeslot[] | "nothing";
  date: Date;
}

export default function Timeslots({ models, date }: TimeslotsProps) {
  const currentUserFR = useContext(UserContext);
  const { currentUser } = currentUserFR;
  const [realUser] = currentUser;
  const { userType } = realUser;
  console.log(date);
  console.log(models);
  if (models !== "nothing") {
    timeslots = [];
    models.forEach((model) => {
      if (
        typeof model.startTime === "string" &&
        typeof model.endTime === "string"
      ) {
        timeslots.push({
          startTime: new Date(`July 4 1776 ${model.startTime}`),
          endTime: new Date(`July 4 1776 ${model.endTime}`),
          checked: false,
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
              startTime={timeslot.startTime}
              endTime={timeslot.endTime}
            />
          ))}
      </Slots>
    </Wrapper>
  );
}
