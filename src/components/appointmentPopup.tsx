import React, { useState } from "react";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";
import "@fontsource/roboto";
import Horse from "../images/horseRider.svg";
import { Box } from "./styledComponents";

const Logo = styled.img`
  width: 2.5em;
  display: block;
  padding-right: 10px;
`;

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`;

const RiderInfo = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 80%;
  line-height: 19px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  color: black;
  background: white;
  padding-top: 20px;
`;
const Header = styled.h1`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 125%;
  line-height: 200%;
  background: white;
  color: #1b4c5a;
`;

export default function AppointmentPopup() {
  const [popupShown, setPopupShown] = useState(false);
  const togglePopup = () => {
    setPopupShown(!popupShown);
  };
  return (
    <div>
      <Button type="button" onClick={togglePopup}>
        Click Me
      </Button>
      <Box style={{ display: popupShown ? "block" : "none" }}>
        <Header>Appointment Info</Header>
        <RiderInfo>
          <Logo src={Horse} /> Riders: Jane Doe, John Smith
        </RiderInfo>
      </Box>
    </div>
  );
}
