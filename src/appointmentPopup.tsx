import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";
import "@fontsource/roboto";
import { ReactComponent as Horse } from "./images/Horse.svg";

const Button = styled.button`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`;
const Div = styled.div`
  background: palevioletred;
  border-radius: 3px;
  border: none;
  color: white;
`;
const StyledPopup = styled(Popup)`
  border: none;
  display: flex;
  shadow: none;
  background: black;
`;
const RiderInfo = styled(Div)`
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
  padding: 2.5%;
`;
const Header = styled(Div)`
  padding: 10%;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 18px;
  line-height: 21px;
  background: white;
  color: #1b4c5a;
`;

export default function AppointmentPopup() {
  return (
    <div>
      <StyledPopup trigger={<Button> Trigger</Button>} position="right center">
        <Header>Appointment Info</Header>
        <RiderInfo>
          <Horse /> Riders: Jane Doe, John Smith
        </RiderInfo>
      </StyledPopup>
    </div>
  );
}
