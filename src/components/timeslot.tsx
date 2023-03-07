import React, { useState } from "react";
// import React from "react";
import styled from "styled-components";
import timeslots from "./timeslots";
import Checked from "../images/Checked.png";
import Unchecked from "../images/Unchecked.png";

import {
  Wrapper,
  Box,
  Button,
  // Input,
  // Label,
  // PasswordContainer,
  // EyeSlash,
  // Question,
  // TextLink,
  // ErrorMessage,
} from "./styledComponents";

// const ChevronDown = styled.img`
//   width: auto;
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
//   transform: rotate(270deg);
// `;
// const ChevronUp = styled.img`
//   width: auto;
//   display: block;
//   margin-left: auto;
//   margin-right: auto;
//   transform: rotate(90deg);
// `;
// const StyledBtn = styled.button`
//   border: none;
//   background: none;
//   vertical-align: middle;
// `;

const Boxed = styled(Box)``;

const ButtonToggle = styled(Button)``;

export default function Timeslot() {
  // const [dropdownShown0, setDropdownShown0] = useState(false);
  // const [showChecked, setshowChecked] = useState(false);
  // // const [showUnchecked, setshowUnchecked] = useState(false);
  const [counters, setCounters] = useState(timeslots);

  function toggleChecked(index: any) {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    // timeslots[index].checked = !timeslots[index.checked];

    // const nextCounters = counters.map((c, i) => {
    //   if (i === index) {
    //     // Increment the clicked counter
    //     //return c + 1;
    //     return !timeslots[index.checked];
    //   } else {
    //     // The rest haven't changed
    //     return timeslots[index.checked];
    //   }
    // });
    setCounters(!timeslots[index].checked);
  };
  // const toggleUnchecked = () => {
  //   // When the handler is invoked
  //   // inverse the boolean state of passwordShown
  //   setshowUnchecked(!showUnchecked);
  //   setshowChecked(false);
  // };
  // const [dropdownShown0, setDropdownShown0] = useState(false);

  return (
    <Wrapper>
      <Boxed>
        {timeslots.map((timeslot, index) => (
          <Box>
            {timeslot.time}
            <ButtonToggle onClick={() => toggleChecked(index)}>
              {timeslot.checked ? (
                <img src={Checked} alt="Checked Img" />
              ) : (
                <img src={Unchecked} alt="Unchecked Img" />
              )}
            </ButtonToggle>
          </Box>
        ))}
      </Boxed>
    </Wrapper>
  );
}
