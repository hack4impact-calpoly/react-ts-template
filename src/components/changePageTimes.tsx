import { useState } from "react";
import styled from "styled-components";
import OnSlider from "../images/OnSlider.png";
import OffSlider from "../images/OffSlider.png";

// const Caret = styled.img`
//   margin-left: 10%;
//   cursor: pointer;
// `;

const Text = styled.text`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
`;

const ButtonToggle = styled.image`
  cursor: pointer;
  align-self: center;
  scale: 15%;
  box-shadow: none;
  height: 40epx;
`;

const Slot = styled.section`
  display: flex;
  flex-direction: row;
  font-family: "Rubik", sans-serif;
  align-items: center;
  justify-content: center;
  margin: 4%;
  box-sizing: border-box;
  background: rgba(144, 191, 204, 0.7);
  border: 1px solid #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  width: 310px;
  height: 53px;
`;

// const Dropdown = styled.section`
//   display: flex;
//   flex-direction: column;
// `;

interface TimeslotType {
  timeslots: { startTime: Date; endTime: Date; selected: boolean }[];
  idx: number;
}

export default function TimeSlots({ timeslots, idx }: TimeslotType) {
  const [isSelectedTimes, setIsSelectedTimes] = useState(timeslots);

  function toggleSlider(index: number) {
    const updatedTimeSlots = isSelectedTimes.map((timeslot: any, i: any) => {
      if (i === index) {
        // Increment the clicked counter;
        return {
          startTime: timeslot.startTime,
          endTime: timeslot.endTime,
          selected: !timeslot.selected,
        };
      }
      // The rest haven't changed
      return {
        startTime: timeslot.startTime,
        endTime: timeslot.endTime,
        selected: false,
      };
    });
    setIsSelectedTimes(updatedTimeSlots);
  }

  const formatTime = (time: Date) =>
    time.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

  return (
    <div>
      <Slot>
        <Text>{`${formatTime(timeslots[idx].startTime)} to ${formatTime(
          timeslots[idx].endTime
        )}`}</Text>
        {/* <Caret src={OnSlider} onClick={toggleDropdown} /> */}
      </Slot>
      <ButtonToggle onClick={() => toggleSlider(idx)}>
        {isSelectedTimes ? (
          <img src={OnSlider} alt="Checked Img" />
        ) : (
          <img src={OffSlider} alt="Unchecked Img" />
        )}
      </ButtonToggle>
    </div>
  );
}
