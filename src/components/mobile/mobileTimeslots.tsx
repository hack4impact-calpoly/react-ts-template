/* eslint-disable no-console */
import { useContext } from "react";
import styled from "styled-components";
import UserContext from "../../userContext";
import MobileTimeslot from "./mobileTimeslot";
import { LazyTimeslot } from "../../models";

// added height and margin-top and changed overflowy to overflow-y
const Slots = styled.section`
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7%;
  margin-top: 10%;
  width: 100%;
  height: 400px;
`;

interface TsData {
  startTime: Date;
  endTime: Date;
  checked: false;
  id: string;
}

interface TimeslotsProps {
  models: LazyTimeslot[] | "nothing";
  date: Date;
}

export default function MobileTimeslots({ models, date }: TimeslotsProps) {
  // const filteredTimeslots = [];
  const currentUserFR = useContext(UserContext);
  const { currentUser } = currentUserFR;
  const [realUser] = currentUser;
  const { userType } = realUser;
  const timeslots: TsData[] = [];
  if (realUser !== null) {
    console.log("mobile timeslots component just needs userType");
    console.log(userType);
  }
  console.log(
    "I'm not using the date for now cause I'm tired but it is: ",
    date
  );
  // if (userType === "Volunteer") {
  //   // Filter timeslots between 9 AM and 5 PM for volunteers
  //   filteredTimeslots = timeslots.filter(
  //     (timeslot) =>
  //       timeslot.startTime.getHours() >= 9 && timeslot.endTime.getHours() <= 17
  //   );
  // } else if (userType === "Rider") {
  //   // Filter timeslots between 10 AM and 2 PM for riders
  //   filteredTimeslots = timeslots.filter(
  //     (timeslot) =>
  //       timeslot.startTime.getHours() >= 10 && timeslot.endTime.getHours() <= 14
  //   );
  // } else if (userType === "Admin") {
  //   // show's all time slots for admin
  //   filteredTimeslots = timeslots;
  // }

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
      return ts.startTime.getHours() >= 9 && ts.startTime.getHours() < 17;
    }
    return ts.startTime.getHours() >= 10 && ts.startTime.getHours() < 14;
  }

  return (
    <Slots>
      {/* {filteredTimeslots.map((timeslot) => (
        <MobileTimeslot
          startTime={timeslot.startTime}
          endTime={timeslot.endTime}
        />
      ))} */}
      {timeslots
        .filter((ts) => filterTimeSlots(userType === "Volunteer", ts))
        .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
        .map((timeslot, i) => (
          <MobileTimeslot // eslint-disable-next-line react/no-array-index-key
            key={i}
            startTime={timeslot.startTime}
            endTime={timeslot.endTime}
            tsId={timeslot.id}
          />
        ))}
    </Slots>
  );
}
