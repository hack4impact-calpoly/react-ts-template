import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import warning from "../../images/warning.svg";
import {
  // Wrapper,
  Box,
  Description,
  Header,
  Button,
  Row,
  PopupDiv,
  // PopupBox,
} from "../styledComponents";

const Warning = styled.img`
  position: relative;
  width: 80px;
`;

const SurroundingBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 15%;
  padding-right: 15%;
  padding-top: 10%;
  padding-bottom: 10%;
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

interface PopupProps {
  openProp: boolean;
  onClose: () => void;
}

export default function LogoutPopup({ openProp, onClose }: PopupProps) {
  const [open, setOpen] = useState<boolean>(openProp);
  // const navigate = useNavigate();

  useEffect(() => {
    setOpen(openProp);
  }, [openProp]);

  // const handleClick = () => {
  //   navigate("/");
  //   setOpen(false);
  //   // onData();
  // };

  return (
    <PopupDiv open={open} onClose={onClose}>
      <SurroundingBox>
        <Warning src={warning} />
        <Header>Signing Out?</Header>
        <Description>
          You are attempting to logout of your account. Doing so will take you
          back to the sign in page.
        </Description>
        <Row>
          <CancelButton onClick={onClose}>Cancel</CancelButton>
          <ConfirmButton>Logout</ConfirmButton>
        </Row>
      </SurroundingBox>
    </PopupDiv>
  );
}
