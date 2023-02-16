import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import logo from "./images/logo1.svg";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10% 10%;
`;

const Box = styled.section`
  border: solid 0.5px #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  font-family: "Rubik", sans-serif;
  background: white;
  width: 35%;
  text-align: center;
  padding: 3rem 5rem;

  @media (max-width: 500px) {
    border: none;
    box-shadow: none;
    margin: 0rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    margin-left: auto;
    margin-right: auto;
    margin-top: 30%;
    padding: auto;
    width: fit-content;
  }
`;

const LargeText = styled.text`
  color: #011338;
  font-size: 35px;
  margin: 2rem 0.5rem;
  @media (max-width: 500px) {
    margin: 2rem 0rem;
    padding: auto;
    width: fit-content;
    align-self: center;
  }
`;

const Logo = styled.img`
  width: 2.5em;
  display: block;
  margin-left: auto;
  margin-right: auto;
`;

const Button = styled.button`
  background: #1b4c5a;
  border: solid 0.5px #6c6b6b;
  color: white;
  height: 2.8rem;
  margin-top: 2rem;
  font-weight: bold;
  width: 15rem;
  align-self: center;
`;

function Success() {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleClick = () => {
    navigate("/login");
  };

  return (
    <Wrapper>
      <Box>
        <Logo src={logo} />
        <LargeText>Success!</LargeText>
        {id === "reset"
          ? "You have successfully reset your password."
          : "You have successfully signed up for an account."}

        <Button onClick={handleClick}>Back to Login</Button>
      </Box>
    </Wrapper>
  );
}

export default Success;
