// import React, { ChangeEvent, useState } from "react";
import React from "react";
import styled from "styled-components";
import warning from "../images/warning.svg";

import {
  Wrapper,
  Box,
  Description,
  Header,
  Button,
  Row,
  // Description,
  // Input,
  // Label,
  // PasswordContainer,
  // EyeSlash,
  // Question,
  // TextLink,
  // ErrorMessage,
} from "./styledComponents";

export type TimeSlotProps = {
  userType: String;
  status: String;
};
const Warning = styled.img`
  position: relative;
  scale: 25%;
`;
export default function TimeSlotConfirmation({
  userType,
  status,
}: TimeSlotProps) {
  return (
    <Wrapper>
      {userType === "admin" && (
        <Box>
          <Warning src={warning} />
          <Header>Save changes?</Header>
          <Description>
            You are choosing to edit the availability of one or more time slots.
            Are you sure you want to do this?
          </Description>
          <Row>
            <Button>Cancel</Button>
            <Button>Confirm</Button>
          </Row>
        </Box>
      )}
      {userType !== "admin" && status === "cancel" && (
        <Box>
          <Warning src={warning} />
          <Header>Confirm cancellation?</Header>
          <Description>
            You are choosing to cancel one or more time slots. Are you sure you
            want to do this?
          </Description>
          <Row>
            <Button>Cancel</Button>
            <Button>Confirm</Button>
          </Row>
        </Box>
      )}
      {userType !== "admin" && status === "book" && (
        <Box>
          <Warning src={warning} />
          <Header>Confirm booking?</Header>
          <Description>
            You are choosing to book one or more time slots. Are you sure you
            want to do this?
          </Description>
          <Row>
            <Button>Cancel</Button>
            <Button>Book</Button>
          </Row>
        </Box>
      )}
    </Wrapper>
  );
}
