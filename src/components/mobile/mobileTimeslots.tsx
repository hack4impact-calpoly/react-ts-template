import styled from "styled-components";
import MobileTimeslot from "./mobileTimeslot";
import { LazyTimeslot } from "../../models";

const Slots = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

interface TimeslotsProps {
  userType: "volunteer" | "rider" | "admin";
  models: LazyTimeslot[] | "nothing";
}

let timeslots = [
  {
    startTime: new Date(2023, 2, 7, 9, 0),
    endTime: new Date(2023, 2, 7, 10, 0),
  },
  {
    startTime: new Date(2023, 2, 7, 10, 0),
    endTime: new Date(2023, 2, 7, 11, 0),
  },
  {
    startTime: new Date(2023, 2, 7, 11, 0),
    endTime: new Date(2023, 2, 7, 12, 0),
  },
  {
    startTime: new Date(2023, 2, 7, 12, 0),
    endTime: new Date(2023, 2, 7, 13, 0),
  },
  {
    startTime: new Date(2023, 2, 7, 13, 0),
    endTime: new Date(2023, 2, 7, 14, 0),
  },
  {
    startTime: new Date(2023, 2, 7, 14, 0),
    endTime: new Date(2023, 2, 7, 15, 0),
  },
  {
    startTime: new Date(2023, 2, 7, 15, 0),
    endTime: new Date(2023, 2, 7, 16, 0),
  },
  {
    startTime: new Date(2023, 2, 7, 16, 0),
    endTime: new Date(2023, 2, 7, 17, 0),
  },
];

export default function MobileTimeslots({ userType, models }: TimeslotsProps) {
  let filteredTimeslots: { startTime: Date; endTime: Date }[] = [];
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
        });
      }
    });
  }
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
  } else {
    filteredTimeslots = timeslots;
  }

  return (
    <Slots>
      {filteredTimeslots
        .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
        .map((timeslot) => (
          <MobileTimeslot
            userType={userType}
            startTime={timeslot.startTime}
            endTime={timeslot.endTime}
          />
        ))}
    </Slots>
  );
}
