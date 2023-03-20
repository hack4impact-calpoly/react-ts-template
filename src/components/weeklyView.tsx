import React from "react";
import styled from "styled-components";
import FullCalendar from "@fullcalendar/react";
import timeGridPlugin from "@fullcalendar/timegrid";

const Wrapper = styled.div`
  font-family: "Rubik", sans-serif;
  padding: 1rem;
`;

const CalDiv = styled.div`
  font-family: "Rubik", sans-serif;
  width: 80%;
  right,
  prev-button,
  next-button {
    background-color: #b1d583;
    background-image: none;
  }
  td {
    text-align: center;
    font-weight: bold;
  }
`;

export interface TimeSlotsData {
  startTime: Date;
  endTime: Date;
  unavailableDates: Date[];
  volunteerBookings: String[];
  riderBookings: String[];
}
/*
const tmpTimes = [
  {
    startTime: new Date("March 5, 2023 09:00:00"),
    endTime: new Date("March 5, 2023 09:30:00"),
    unavailableDates: [],
    volunteerBookings: [],
    riderBookings: [],
    topOfHour: true,
  },
  {
    startTime: new Date("March 6, 2023 12:20:00"),
    endTime: new Date("March 6, 2023 12:50:00"),
    unavailableDates: [],
    volunteerBookings: [],
    riderBookings: [],
  },
  {
    startTime: new Date("March 7, 2023 11:10:00"),
    endTime: new Date("March 7, 2023 11:40:00"),
    unavailableDates: [],
    volunteerBookings: [],
    riderBookings: [],
  },
  {
    startTime: new Date("March 8, 2023 4:30:00"),
    endTime: new Date("March 8, 2023 5:00:00"),
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
*/

const tmpTimes = [
  {
    start: new Date("March 5, 2023 09:00:00").toISOString(),
    end: new Date("March 5, 2023 09:30:00").toISOString(),
    backgroundColor: "#90BFCC",
    textColor: "black",
  },
  {
    start: new Date("March 6, 2023 12:20:00"),
    end: new Date("March 6, 2023 12:50:00"),
    backgroundColor: "#90BFCC",
    textColor: "black",
  },
  {
    start: new Date("March 7, 2023 11:10:00"),
    end: new Date("March 7, 2023 11:40:00"),
    backgroundColor: "#90BFCC",
    textColor: "black",
  },
  {
    start: new Date("March 8, 2023 4:30:00"),
    end: new Date("March 8, 2023 5:00:00"),
    backgroundColor: "#90BFCC",
    textColor: "black",
  },
  {
    start: new Date("March 11, 2023 10:00:00"),
    end: new Date("March 11, 2023 10:30:00"),
    backgroundColor: "#90BFCC",
    textColor: "black",
  },
];

export interface WeeklyViewProps {
  startDate: Date;
}

export default function WeeklyView() {
  /*
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

  /*
  const handleCalenderTimeClick = (CalendarTimeSlot: TimeSlotsData) => {
    // eslint-disable-next-line no-alert
    alert(
      `yay! you can click! ${CalendarTimeSlot.startTime.toLocaleTimeString()}`
    );
  };
  */

  return (
    <CalDiv>
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridWeek"
        events={tmpTimes}
        allDaySlot={false}
        slotMinTime="8:00:00"
        slotMaxTime="18:00:00"
        expandRows={true}
        displayEventEnd
        displayEventTime
        dayHeaderFormat={{ weekday: "short", day: "numeric" }}
      />
    </CalDiv>
    /*
  
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
                </td>
              ))}
            </tr>
          ))}
          {tmpTimes.map((slot) => (
            <StyledSlot>{`${slot.startTime.toLocaleTimeString()}`}</StyledSlot>
          ))}
        </tbody>
      </StyledTable>
    </Wrapper>
  */
  );
}

export { Wrapper };
