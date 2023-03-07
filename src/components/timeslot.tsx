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
  const [showChecked0, setshowChecked0] = useState(false);
  const toggleChecked0 = () => {
    setshowChecked0(!showChecked0);
  };
  const [showChecked1, setshowChecked1] = useState(false);
  const toggleChecked1 = () => {
    setshowChecked1(!showChecked1);
  };
  const [showChecked2, setshowChecked2] = useState(false);
  const toggleChecked2 = () => {
    setshowChecked2(!showChecked2);
  };
  const [showChecked3, setshowChecked3] = useState(false);
  const toggleChecked3 = () => {
    setshowChecked3(!showChecked3);
  };
  const [showChecked4, setshowChecked4] = useState(false);
  const toggleChecked4 = () => {
    setshowChecked4(!showChecked4);
  };
  const [showChecked5, setshowChecked5] = useState(false);
  const toggleChecked5 = () => {
    setshowChecked5(!showChecked5);
  };
  const [showChecked6, setshowChecked6] = useState(false);
  const toggleChecked6 = () => {
    setshowChecked6(!showChecked6);
  };
  const [showChecked7, setshowChecked7] = useState(false);
  const toggleChecked7 = () => {
    setshowChecked7(!showChecked7);
  };
  const [showChecked8, setshowChecked8] = useState(false);
  const toggleChecked8 = () => {
    setshowChecked8(!showChecked8);
  };
  const [showChecked9, setshowChecked9] = useState(false);
  const toggleChecked9 = () => {
    setshowChecked9(!showChecked9);
  };

  return (
    <Wrapper>
      <Boxed>
        <Box>{timeslots[0]}</Box>
        <ButtonToggle onClick={toggleChecked0}>
          {showChecked0 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
        <Box>{timeslots[1]}</Box>
        <ButtonToggle onClick={toggleChecked1}>
          {showChecked1 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
        <Box>{timeslots[2]}</Box>
        <ButtonToggle onClick={toggleChecked2}>
          {showChecked2 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
        <Box>{timeslots[3]}</Box>
        <ButtonToggle onClick={toggleChecked3}>
          {showChecked3 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
        <Box>{timeslots[4]}</Box>
        <ButtonToggle onClick={toggleChecked4}>
          {showChecked4 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
        <Box>{timeslots[5]}</Box>
        <ButtonToggle onClick={toggleChecked5}>
          {showChecked5 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
        <Box>{timeslots[6]}</Box>
        <ButtonToggle onClick={toggleChecked6}>
          {showChecked6 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
        <Box>{timeslots[7]}</Box>
        <ButtonToggle onClick={toggleChecked7}>
          {showChecked7 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
        <Box>{timeslots[8]}</Box>
        <ButtonToggle onClick={toggleChecked8}>
          {showChecked8 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
        <Box>{timeslots[9]}</Box>
        <ButtonToggle onClick={toggleChecked9}>
          {showChecked9 ? (
            <img src={Checked} alt="Checked Img" />
          ) : (
            <img src={Unchecked} alt="Unchecked Img" />
          )}
        </ButtonToggle>
      </Boxed>

      {/* <Boxed>
        {timeslots.map((time) => (
          <>
            <Box>{time}</Box>
            <ButtonToggle onClick={toggleChecked}>
              {showChecked ? (
                <img src={Checked} alt="Checked Img" />
              ) : (
                <img src={Unchecked} alt="Unchecked Img" />
              )}
            </ButtonToggle>
          </>
        ))}
      </Boxed> */}
    </Wrapper>
  );
}
