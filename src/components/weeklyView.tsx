import React, { useState } from "react";
import styled from "styled-components";
import chevronLeft from "../images/chevronLeft.svg";

const Wrapper = styled.div`
  font-family: "Rubik", sans-serif;
  padding: 1rem;
`;

const Head = styled.div`
  display: flex;
  align-items: center;
  vertical-align: middle;
  height: 3rem;
  padding-left: 3.5rem;
`;

const StyledBtn = styled.button`
  border: none;
  background: none;
  vertical-align: middle;
`;

const ChevronLeft = styled.img`
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const ChevronRight = styled.img`
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transform: scaleX(-1);
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  td {
    border: 3px solid #dfdfdf;
  }
  th,
  td,
  tr {

  },
  border: 3px solid #dfdfdf;
  text-align: center;
  td:nth-child(8n + 1) {
    border: none;
    padding-top: 0;
    font-size: 16px;
    text-align: right;
  }
  thead {
    color: #747474;
  }
  tbody td + td {
    width: 11rem;
  }
  table {
    width: 100%;
    table-layout: fixed;
  }
`;

const StyledTD = styled.td`
  padding-top: 0;
  vertical-align: top;
`;

const LargeText = styled.text`
  color: #000000;
  font-weight: bold;
  font-size: 30px;
  width: 8em;

  margin: 2rem 0.5rem;
  @media (max-width: 500px) {
    margin: 2rem 0rem;
    padding: auto;
    width: fit-content;
    align-self: center;
  }
`;

const StyledDiv = styled.text`
  background-color: #cce1e7;
  opacity: 70%;
  width: 100%;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  border-bottom: 3px solid #90bfcc;
  font-weight: bold;
`;
/*

const StyledDiv1 = styled.text`
  background-color: #cce1e7;
  opacity: 70%;
  width: 100%;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  font-weight: bold;
`;

const StyledDiv10 = styled.text`
  background-color: #cce1e7;
  opacity: 70%;
  width: 100%;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  margin-top: 0.3em;
  font-weight: bold;
`;

const StyledDiv11 = styled.text`
  background-color: #cce1e7;
  opacity: 70%;
  width: 100%;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  margin-top: 0.3em;
  font-weight: bold;
`;

const StyledDiv11_2 = styled.text`
  background-color: #cce1e7;
  opacity: 70%;
  width: 100%;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  margin-top: 0.3em;
  font-weight: bold;
`;

const StyledDiv12 = styled.text`
  background-color: #cce1e7;
  opacity: 70%;
  width: 100%;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  margin-top: 1.2em;
  margin-bottom: 0.9em;
  font-weight: bold;
`;

const StyledDiv1255 = styled.text`
  background-color: #cce1e7;
  opacity: 70%;
  width: 100%;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  margin-bottom: 0.3em;
  font-weight: bold;
`;
*/
const OuterDiv = styled.text`
  display: flex;
  flex-direction: column;
  overflow: visible;
`;

export interface TimeSlotsData {
  startTime: Date;
  endTime: Date;
  unavailableDates: Date[];
  volunteerBookings: String[];
  riderBookings: String[];
}

const tmpTimes = [
  {
    startTime: new Date("March 5, 2023 09:00:00"),
    endTime: new Date("March 5, 2023 09:30:00"),
    unavailableDates: [],
    volunteerBookings: [],
    riderBookings: [],
  },
  {
    startTime: new Date("March 6, 2023 02:00:00"),
    endTime: new Date("March 6, 2023 02:30:00"),
    unavailableDates: [],
    volunteerBookings: [],
    riderBookings: [],
  },
  {
    startTime: new Date("March 7, 2023 05:30:00"),
    endTime: new Date("March 7, 2023 6:00:00"),
    unavailableDates: [],
    volunteerBookings: [],
    riderBookings: [],
  },
  {
    startTime: new Date("March 8, 2023 12:30:00"),
    endTime: new Date("March 8, 2023 1:00:00"),
    unavailableDates: [],
    volunteerBookings: [],
    riderBookings: [],
  },
  {
    startTime: new Date("March 11, 2023 10:00:00"),
    endTime: new Date("March 11, 2023 10:30:00"),
    unavailableDates: [],
    volunteerBookings: [],
    riderBookings: [],
  },
];

export interface WeeklyViewProps {
  startDate: Date;
}

export default function WeeklyView({ startDate }: WeeklyViewProps) {
  const [currentDate, setCurrentDate] = useState(startDate);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000));
  }

  const hours = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5];

  const handleNextWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() + 7 * 24 * 60 * 60 * 1000));
  };

  const handlePrevWeek = () => {
    setCurrentDate(new Date(currentDate.getTime() - 7 * 24 * 60 * 60 * 1000));
  };

  function getStartOfWeek(day: Date): Date {
    const diff = day.getDate() - day.getDay() + (day.getDay() === -1 ? -7 : 0);
    return new Date(day.setDate(diff));
  }

  function getEndOfWeek(day: Date): Date {
    return new Date(day.getTime() + 6 * 24 * 60 * 60 * 1000);
  }

  return (
    <Wrapper>
      <Head>
        <LargeText>
          {getStartOfWeek(currentDate)
            .toLocaleDateString("en-us", { month: "long", day: "numeric" })
            .concat("-")
            .concat(
              getEndOfWeek(currentDate).toLocaleDateString("en-us", {
                day: "numeric",
              })
            )}
        </LargeText>
        <StyledBtn type="button" onClick={handlePrevWeek}>
          <ChevronLeft src={chevronLeft} />
        </StyledBtn>
        <StyledBtn type="button" onClick={handleNextWeek}>
          <ChevronRight src={chevronLeft} />
        </StyledBtn>
      </Head>
      <StyledTable>
        <thead>
          <tr>
            <div />
            {days.map((day) => (
              <th key={day.toDateString()}>
                {day
                  .toLocaleDateString("en-us", {
                    weekday: "short",
                  })
                  .toUpperCase()
                  .concat(" ")
                  .concat(day.toLocaleDateString("en-us", { day: "numeric" }))}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {hours.map((hour) => (
            <tr key={hour}>
              <StyledTD>{`${hour}`}</StyledTD>
              {days.map((day) => (
                <td key={`${day.toDateString()}-${hour}`}>
                  <OuterDiv>
                    {/* tmpTimes.map((slot) => (
                    /* 
                    
                      //if (slot.startTime.getHours()===hour) {
                    map tmpTimeslots, check if day of week of timeslot===local day variable
                    check if hour (whole number, ignore minutes) === local hour var
                    if both true, render CalendarTimeSlot COMPONENT (component should be a button or clickable div) (pass in timeslot we're currently on (mapped value) as prop)
                      - inside Timeslot component,
                      - we sort the timeslots by time (if not already sorted)
                      - check if both :00 and :30 exist to decide how to render location, pass in some variable to indicate what should be done for padding/location (could be 0, 1, 2 or something)) 
                    */}
                    <StyledDiv>{`${hour}h ${day}day`}</StyledDiv>
                    {/*
                    
                    {hour === 10 ? (
                      <>
                        <StyledDiv>{`${hour}:00-${hour}:30`}</StyledDiv>
                        <StyledDiv10>{`${hour}:35-${hour + 1}:05`}</StyledDiv10>
                      </>
                    ) : hour === 11 ? (
                      <>
                        <StyledDiv11>{`${hour}:10-${hour}:40`}</StyledDiv11>
                        <StyledDiv11_2>{`${hour}:45-${
                          hour + 1
                        }:15`}</StyledDiv11_2>
                      </>
                    ) : hour === 12 ? (
                      <StyledDiv12>{`${hour}:20-${hour}:50`}</StyledDiv12>
                    ) : hour === 1 ? (
                      <>
                        <StyledDiv1255>{`${
                          hour + 11
                        }:55-${hour}:25`}</StyledDiv1255>
                        <StyledDiv1>{`${hour}:30-${hour + 1}:00`}</StyledDiv1>
                      </>
                    ) : (
                      <>
                        <StyledDiv>{`${hour}:00-${hour}:30`}</StyledDiv>
                        <StyledDiv1>{`${hour}:30-${hour + 1}:00`}</StyledDiv1>
                      </>
                    )}
                    */}
                  </OuterDiv>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
}

export {
  Wrapper,
  Head,
  StyledBtn,
  ChevronLeft,
  ChevronRight,
  StyledTable,
  LargeText,
};
