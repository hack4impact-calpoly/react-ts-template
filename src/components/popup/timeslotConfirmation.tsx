// import React, { ChangeEvent, useState } from "react";
import React from "react";
import styled from "styled-components";
import warning from "../../images/warning.svg";
import ExitX from "../../images/exitx.png";

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
} from "../styledComponents";

export type TimeSlotProps = {
  userType: String;
  status: String;
};
const Warning = styled.img`
  position: relative;
  width: 80px;
`;

const SurroundingBox = styled(Box)`
  display: flex;
  align-items: center;
  width: 60rem;
  height: 40rem;
  line-height: 3;
`;

const ConfirmButton = styled(Button)`
  width: 11rem;
  height: 3rem;
  margin-left: 1rem;
`;

const CancelButton = styled(Button)`
  width: 11rem;
  height: 3rem;
  background: white;
  color: #1b4c5a;
  margin-right: 1rem;
`;

const Ximg = styled.img`
  align-self: flex-start;
  align-self: start;
  padding-bottom: 5rem;
  cursor: pointer;
  width: 40px;
  margin-top: -7rem;
  margin-left: -2rem;
`;

const ButtonRow = styled(Row)``;

const OuterWrapper = styled(Wrapper)``;

export default function TimeSlotConfirmation({
  userType,
  status = "",
}: TimeSlotProps) {
  return (
    <OuterWrapper>
      {userType === "admin" && (
        <SurroundingBox>
          <Ximg src={ExitX} />
          <Warning src={warning} />
          <Header>Save changes?</Header>
          <Description>
            You are choosing to edit the availability of one or more time slots.
            Are you sure you want to do this?
          </Description>
          <ButtonRow>
            <CancelButton>Cancel</CancelButton>
            <ConfirmButton>Confirm</ConfirmButton>
          </ButtonRow>
        </SurroundingBox>
      )}
      {userType !== "admin" && status === "cancel" && (
        <SurroundingBox>
          <Ximg src={ExitX} />
          <Warning src={warning} />
          <Header>Confirm cancellation?</Header>
          <Description>
            You are choosing to cancel one or more time slots. Are you sure you
            want to do this?
          </Description>
          <ButtonRow>
            <CancelButton>Cancel</CancelButton>
            <ConfirmButton>Confirm</ConfirmButton>
          </ButtonRow>
        </SurroundingBox>
      )}
      {userType !== "admin" && status === "book" && (
        <SurroundingBox>
          <Ximg src={ExitX} />
          <Warning src={warning} />
          <Header>Confirm booking?</Header>
          <Description>
            You are choosing to book one or more time slots. Are you sure you
            want to do this?
          </Description>
          <ButtonRow>
            <CancelButton>Cancel</CancelButton>
            <ConfirmButton>Book</ConfirmButton>
          </ButtonRow>
        </SurroundingBox>
      )}
    </OuterWrapper>
  );
}
