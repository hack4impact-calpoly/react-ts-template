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
