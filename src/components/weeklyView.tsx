import React, { useState } from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";
// fake props
import { bookings } from "./booking";

const CalDiv = styled.div`
  font-family: "Rubik", sans-serif;
  // width: 100%;
  td {
    text-align: center;
    font-weight: bold;
  }
  .fc {
    height: 700px;
  }
  .fc-toolbar {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
  }
  .fc-prev-button,
  .fc-next-button {
    margin-right: 10px;
    margin-left: 0;
    background-color: white;
    border: none;
  }
  .fc-prev-button span::before,
  .fc-next-button span::before {
    color: #6c6b6b;
  }
  .fc-prev-button:hover,
  .fc-next-button:hover {
    background-color: white;
  }
  .fc-prev-button:active:focus,
  .fc-next-button:active:focus {
    background-color: white;
    border: none;
  }
  .fc-today-button {
    display: none;
  }
`;

export interface WeeklyViewProps {
  // eslint-disable-next-line react/no-unused-prop-types
  start: Date;
  // eslint-disable-next-line react/no-unused-prop-types
  end: Date;
  // eslint-disable-next-line react/no-unused-prop-types
  backgroundColor: "#90BFCC";
  // eslint-disable-next-line react/no-unused-prop-types
  textColor: "black";
  userRole: "volunteer" | "rider" | "admin";
}

export default function WeeklyView({ userRole }: WeeklyViewProps) {
  // eslint-disable-next-line
  const [calTimeslots, setCalTimeslots] = useState(bookings);

  const updatedSlots = calTimeslots.map((timeslot: any) => {
    let backgroundColor = "#90BFCC";

    if (userRole === "rider") {
      const hasRiderBooking = timeslot.riderBookings.length > 0;
      if (hasRiderBooking) {
        backgroundColor = "#E0EFF1";
      }
    } else if (userRole === "volunteer") {
      const hasVolunteerBooking = timeslot.volunteerBookings.length > 0;
      if (hasVolunteerBooking) {
        backgroundColor = "#E0EFF1";
      }
    } else if (userRole === "admin") {
      if (
        timeslot.unavailableDates.includes(timeslot.startTime.toDateString())
      ) {
        backgroundColor = "#E0EFF1";
      }
    }
    return {
      start: timeslot.startTime,
      end: timeslot.endTime,
      backgroundColor,
      textColor: "black",
    };
  });

  return (
    <CalDiv>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={updatedSlots}
        allDaySlot={false}
        slotMinTime="8:00:00"
        slotMaxTime="18:00:00"
        expandRows
        displayEventEnd
        displayEventTime
        dayHeaderFormat={{ weekday: "short", day: "numeric" }}
      />
    </CalDiv>
  );
}
