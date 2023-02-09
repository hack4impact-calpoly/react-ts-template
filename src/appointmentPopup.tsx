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
const StyledPopup = styled(Popup)`
  border: none;
`;
const Section = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 80%;
  line-height: 19px;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

export default function AppointmentPopup() {
  return (
    <Section>
      <Section>
        <StyledPopup
          trigger={<Button> Trigger</Button>}
          position="right center"
        >
          <Section className="infoPopup">
            <Horse /> Riders: Jane Doe, John Smith
          </Section>
        </StyledPopup>
      </Section>
    </Section>
  );
}
