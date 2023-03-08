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

const StyledDiv1 = styled.text`
  background-color: #cce1e7;
  opacity: 70%;
  width: 100%;
  padding-top: 0.7em;
  padding-bottom: 0.7em;
  font-weight: bold;
`;

const OuterDiv = styled.text`
  display: flex;
  flex-direction: column;
`;

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
                    <StyledDiv>{`${hour}:00-${hour}:30`}</StyledDiv>
                    <StyledDiv1>{`${hour}:30-${hour + 1}:00`}</StyledDiv1>
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
