import React, { useState } from "react";
import styled from "styled-components";
import timeslots from "./timeslots";
import chevronLeft from "../images/chevronLeft.svg";

import {
  Wrapper,
  Box,
  // Button,
  // Input,
  // Label,
  // PasswordContainer,
  // EyeSlash,
  // Question,
  // TextLink,
  // ErrorMessage,
} from "./styledComponents";

const ChevronDown = styled.img`
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transform: rotate(270deg);
`;
const ChevronUp = styled.img`
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  transform: rotate(90deg);
`;
const StyledBtn = styled.button`
  border: none;
  background: none;
  vertical-align: middle;
`;
export default function Timeslot() {
  const [dropdownShown0, setDropdownShown0] = useState(false);

  const handleDropDow0n = () => {
    setDropdownShown0(!dropdownShown0);
  };
  const [dropdownShown1, setDropdownShown1] = useState(false);

  const handleDropDown1 = () => {
    setDropdownShown1(!dropdownShown1);
  };
  const [dropdownShown2, setDropdownShown2] = useState(false);

  const handleDropDown2 = () => {
    setDropdownShown2(!dropdownShown2);
  };
  const [dropdownShown3, setDropdownShown3] = useState(false);

  const handleDropDown3 = () => {
    setDropdownShown3(!dropdownShown3);
  };
  const [dropdownShown4, setDropdownShown4] = useState(false);

  const handleDropDown4 = () => {
    setDropdownShown4(!dropdownShown4);
  };
  const [dropdownShown, setDropdownShown] = useState(false);

  const handleDropDown = () => {
    setDropdownShown(!dropdownShown);
  };
  const [dropdownShown, setDropdownShown] = useState(false);

  const handleDropDown = () => {
    setDropdownShown(!dropdownShown);
  };
  const [dropdownShown, setDropdownShown] = useState(false);

  const handleDropDown = () => {
    setDropdownShown(!dropdownShown);
  };
  return (
    <Wrapper>
      <Box>
        {timeslots.map((time) => (
          <Box>
            {" "}
            {time}{" "}
            {!dropdownShown && (
              <StyledBtn type="button" onClick={handleDropDown}>
                <ChevronUp src={chevronLeft} />
              </StyledBtn>
            )}
            {dropdownShown && (
              <StyledBtn type="button" onClick={handleDropDown}>
                <ChevronDown src={chevronLeft} />
              </StyledBtn>
            )}
          </Box>
        ))}
      </Box>
    </Wrapper>
  );
}
