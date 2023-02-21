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
    border: 2px solid #DFDFDF;
  }
  th,
  td,
  tr {
    padding-top: 1em;
    padding-bottom: 1em;
  },
  border: 1px solid #DFDFDF;
  text-align: center;
  td:nth-child(8n+1) {
    border: none;
    padding-top: 0;
    padding-bottom: 2.5em;
    padding-right: 0.5em;
    font-size: 16px;
    text-align: right;
  }
  thead{
    color: #747474;
  }
  tbody td + td{
    width: 7rem;
  }
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

interface WeeklyViewProps {
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
