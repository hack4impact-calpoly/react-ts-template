import React, { useState } from "react";
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
  background: white;
`;
const StyledPopup = styled(Div)`
  display: flex;
  background: black;
  width: 25%;
  height: 25%;
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
  padding: 5%;
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
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPopupShown(!popupShown);
  };
  return (
    <div>
      <Button type="button" onClick={togglePopup}>
        Click Me
      </Button>
      <StyledPopup
        className="invalidAlert"
        style={{ display: popupShown ? "block" : "none" }}
      >
        {" "}
        <Header>Appointment Info</Header>
        <RiderInfo>
          <Horse /> Riders: Jane Doe, John Smith
        </RiderInfo>
      </StyledPopup>
    </div>
  );
}
