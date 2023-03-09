import React, { useState } from "react";
import styled from "styled-components";
import { Wrapper, Box, Label, Description } from "./styledComponents";
import "@fontsource/roboto";

const Encompasing = styled(Wrapper)`
  display: flex;
  justify-content: space-between;
`;

const CheckBox = styled.div`
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 2px #1b4c5a;
  width: 2rem;
  height: 2rem;
`;
const Check = styled.div`
  border-radius: 5px;
  border: solid 0.5px #c4c4c4;
  background-color: #1b4c5a;
  height: 1.3rem;
  width: 1.3rem;
`;

const NotCheck = styled.div`
  border-radius: 5px;
  background-color: white;
  height: 1.3rem;
  width: 1.3rem;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
  padding: 3%;
`;

const ViewingBox = styled(Box)`
  border: 0;
  box-shadow: none;
  padding: 0;
  width: 100%;
`;

const ViewingText = styled(Label)`
  padding-bottom: 10%;
  font-size: 130%;
  font-family: "Roboto";
`;

const ViewingDescription = styled(Description)`
  font-family: "Roboto";
  padding-left: 3%;
  font-size: 100%;
  padding-top: 4%;
`;

const ShowTimes = styled.div`
  font-family: "Roboto";
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
    setShowBoth(!showBoth);
    setShowRiders(false);
    setShowVolunteers(false);
  };

  return (
    <Encompasing>
      <ViewingBox>
        {(showVolunteers || showBoth) && (
          <ShowTimes>show volunteer times</ShowTimes>
        )}
        {(showRiders || showBoth) && <ShowTimes>show rider times</ShowTimes>}
        <ViewingText>Viewing:</ViewingText>
        <Row>
          <CheckBox onClick={toggleBoth}>
            {showBoth ? <Check /> : <NotCheck />}
          </CheckBox>
          <ViewingDescription>Both</ViewingDescription>
        </Row>
        <Row>
          <CheckBox onClick={toggleVolunteer}>
            {showVolunteers ? <Check /> : <NotCheck />}
          </CheckBox>
          <ViewingDescription>Volunteer only</ViewingDescription>
        </Row>
        <Row>
          <CheckBox onClick={toggleRider}>
            {showRiders ? <Check /> : <NotCheck />}
          </CheckBox>
          <ViewingDescription>Rider only</ViewingDescription>
        </Row>
      </ViewingBox>
    </Encompasing>
  );
}
