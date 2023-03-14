import React, { useState } from "react";
import { Link } from "react-router-dom";
import "reactjs-popup/dist/index.css";
import styled from "styled-components";
import { Box } from "./styledComponents";
import AppointmentInfo from "./appointmentInfo";

// import TimeSlotConfirmation from "./timeSlotConfirmation";

const Header = styled.h1`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 125%;
  line-height: 200%;
  background: white;
  color: #1b4c5a;
`;
const ButtonPop = styled.button`
  background: #1b4c5a;
  border: solid 0.5px #6c6b6b;
  color: white;
  height: 2.8rem;
  margin-top: 2rem;
  font-weight: bold;
  width: 15%;
  align-self: center;
  cursor: pointer;
`;

const useStyles = makeStyles({
  root: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
});

export default function AppointmentPopup() {
  const [popupShown, setPopupShown] = useState(false);
  const classes = useStyles();
  const togglePopup = () => {
    setPopupShown(!popupShown);
  };
  return (
    <div>
      <ButtonPop type="button" onClick={togglePopup}>
        Click Me
      </ButtonPop>
      <Box style={{ display: popupShown ? "block" : "none" }}>
        <Header>Appointment Info</Header>
        <AppointmentInfo />
        <Button
          type="button"
          component={Link}
          to="/time-slot-confirmation"
          className={classes.root}
        >
          Click Me
        </Button>
      </Box>
    </div>
  );
}
