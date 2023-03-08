import React, { useState } from "react";
import styled from "styled-components";
import chevronLeft from "../images/chevronLeft.svg";

import {
  // Wrapper,
  Head,
  StyledBtn,
  ChevronLeft,
  ChevronRight,
  StyledTable,
  LargeText,
} from "./weeklyView";

const Wrapper = styled.div`
  font-family: "Rubik", sans-serif;
  padding: 2rem;
`;

import { WeeklyViewProps } from "./weeklyView";

export default function volunteerEvents({ startDate }: WeeklyViewProps) {
  const [currentDate, setCurrentDate] = useState(startDate);
  const days: Date[] = [];
  for (let i = 0; i < 7; i++) {
    days.push(new Date(currentDate.getTime() + i * 24 * 60 * 60 * 1000));
  }

  const hours = [
    "8",
    "8:30",
    "9",
    "9:30",
    "10",
    "10:30",
    "11",
    "11:30",
    "12",
    "12:30",
    "1",
    "1:30",
    "2",
    "2:30",
    "3",
    "3:30",
    "4",
    "4:30",
    "5",
    "5:30",
  ];

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
              <td>{`${hour}`}</td>
              {days.map((day) => (
                <td key={`${day.toDateString()}-${hour}`} />
              ))}
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </Wrapper>
  );
}
