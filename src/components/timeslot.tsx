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

  // const toggleChecked = () => {
  //   // When the handler is invoked
  //   // inverse the boolean state of passwordShown
  //   setshowChecked(!showChecked);
  //   // setshowUnchecked(false);
  // };
  // const toggleUnchecked = () => {
  //   // When the handler is invoked
  //   // inverse the boolean state of passwordShown
  //   setshowUnchecked(!showUnchecked);
  //   setshowChecked(false);
  // };
  const [dropdownShown0, setDropdownShown0] = useState(false);

  const handleDropDown0 = () => {
    setDropdownShown0(!dropdownShown0);
  };
  // const [dropdownShown1, setDropdownShown1] = useState(false);

  // const handleDropDown1 = () => {
  //   setDropdownShown1(!dropdownShown1);
  // };
  // const [dropdownShown2, setDropdownShown2] = useState(false);

  // const handleDropDown2 = () => {
  //   setDropdownShown2(!dropdownShown2);
  // };
  // const [dropdownShown3, setDropdownShown3] = useState(false);

  // const handleDropDown3 = () => {
  //   setDropdownShown3(!dropdownShown3);
  // };
  // const [dropdownShown4, setDropdownShown4] = useState(false);

  // const handleDropDown4 = () => {
  //   setDropdownShown4(!dropdownShown4);
  // };
  // const [dropdownShown5, setDropdownShown5] = useState(false);

  // const handleDropDown5 = () => {
  //   setDropdownShown5(!dropdownShown5);
  // };
  // const [dropdownShown6, setDropdownShown6] = useState(false);

  // const handleDropDown6 = () => {
  //   setDropdownShown6(!dropdownShown6);
  // };
  // const [dropdownShown7, setDropdownShown7] = useState(false);

  // const handleDropDown7 = () => {
  //   setDropdownShown7(!dropdownShown7);

  //   const [dropdownShown8, setDropdownShown8] = useState(false);

  //   const handleDropDown8 = () => {
  //     setDropdownShown8(!dropdownShown8);
  //   };
  //   const [dropdownShown9, setDropdownShown9] = useState(false);

  //   const handleDropDown9 = () => {
  //     setDropdownShown9(!dropdownShown9);
  //   };

  return (
    <Wrapper>
      <Boxed>
        {timeslots.map(item => (
          <Box>
            const container = {};

            container[item.time]
            <ButtonToggle onClick={handleDropDown0}>
              {dropdownShown0 ? (
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
