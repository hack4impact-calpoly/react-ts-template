import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import logo from "../images/horseRider.svg";
import { Wrapper, Box, Button, Description } from "./styledComponents";

const Logo = styled.img`
  width: 2.5em;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Header = styled.text`
  color: #011338;
  font-size: 40px;
  font-weight: bold;
  margin: 1.5rem 0.5rem;
  text-align: center;
  @media (max-width: 500px) {
    margin: 2rem 0rem;
    padding: auto;
    width: fit-content;
    align-self: center;
  }
`;

export default function Success() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Wrapper>
      <Box>
        <Logo src={logo} />
        <Header>Success!</Header>
        <Description>
          {id === "reset"
            ? "You have successfully reset your password."
            : "You have successfully signed up for an account."}
        </Description>
        <Button onClick={handleClick}>Back to Login</Button>
      </Box>
    </Wrapper>
  );
}
