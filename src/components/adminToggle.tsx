import React, { useState } from "react";
import styled from "styled-components";
import { Wrapper, Box, Label, Description } from "./styledComponents";

const CheckBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 0.5px #c4c4c4;
  padding: 10%;
  width: 5%;
`;
const Check = styled.div`
  border: solid 0.5px #c4c4c4;
  background-color: red;
  height: 50%;
  width: 50%;
  padding: 50%;
`;
const Row = styled.div`
  border: solid 0.5px #c4c4c4;
  display: flex;
  flex-direction: row;
`;
export default function AdminToggle() {
  // Initialize a boolean state
  const [showVolunteers, setShowVolunteers] = useState(false);
  const [showRiders, setShowRiders] = useState(false);
  const [showBoth, setShowBoth] = useState(false);
  // Password toggle handler
  const toggleVolunteer = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setShowVolunteers(!showVolunteers);
    setShowRiders(false);
    setShowVolunteers(!showVolunteers);
    setShowBoth(false);
  };
  const toggleRider = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setShowRiders(!showRiders);
    setShowVolunteers(false);
    setShowBoth(false);
  };
  const toggleBoth = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setShowRiders(false);
    setShowVolunteers(false);
    setShowBoth(!showBoth);
  };

  return (
    <Wrapper>
      <Box>
        {(showVolunteers || showBoth) && <div>show volunteer times</div>}
        {(showRiders || showBoth) && <div>show rider times</div>}
        <Label>Viewing:</Label>
        <Row>
          <CheckBox onClick={toggleVolunteer}>
            {showVolunteers && <Check />}
          </CheckBox>
          <Description>Volunteer</Description>
        </Row>
        <Row>
          <CheckBox onClick={toggleRider}>{showRiders && <Check />}</CheckBox>
          <Description>Rider</Description>
        </Row>
        <Row>
          <CheckBox onClick={toggleBoth}>{showBoth && <Check />}</CheckBox>
          <Description>Both</Description>
        </Row>
      </Box>
    </Wrapper>
  );
}
