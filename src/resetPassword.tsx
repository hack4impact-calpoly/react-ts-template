/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState } from "react";
import "./resetPassword.css";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import "@fontsource/rubik";
import eyeSlash from "./images/eyeslash.jpeg";
import backArrow from "./images/backarrow.jpeg";

const Wrapper = styled.section`
  display: flex;
  position: absolute;
  height: 100%;
  width: 100%;
  justify-content: center;
  align-items: center;
  margin: 0;
  padding: 0;
`;

const Box = styled.section`
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
  min-width: 25%;
  text-align: left;
  display: table-cell;
  position: relative;
  background: #fefefe;
  border: 0.5px solid #c4c4c4;
  box-shadow: 0px 10px 24px rgba(49, 77, 137, 0.15);
  padding: 70px 90px 70px 90px;
  @media (max-width: 500px) {
    display: inline-block;
    width: 100%;
    border: none;
    box-shadow: none;
    margin: 0rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    padding: 30px 50px 30px 50px;
  }
`;

const Header = styled.text`
  font-style: normal;
  font-weight: 500;
  font-size: 3rem;
  line-height: 47px;
  color: #011338;
  @media (max-width: 500px) {
    font-size: 1.5rem;
    font-weight: 900;
  }
`;

const Header2 = styled.text`
  display: flex;
  padding-top: 5%;
  font-weight: 400;
  font-size: 1rem;
  line-height: 150%;
  font-style: normal;
  width: 90%;
  height: 5rem;
  color: #000d26;
`;
const NewP = styled.section`
  font-weight: 500;

  // trying to make it look nicer when it's in mobile mode
  @media (max-width: 500px) {
  }
`;

const NewPTxt = styled.text`
  font-size: 1.125rem;
  line-height: 1.3125rem;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 3rem;
  border: 1px solid rgba(143, 143, 143, 0.6);
  margin-bottom: 10%;
`;
const StyledInput2 = styled.input`
  box-sizing: border-box;
  width: 100%;
  height: 3rem;
  border: 1px solid rgba(143, 143, 143, 0.6);
`;
const ErrorMess = styled.text`
  font-size: 10px;
  position: absolute;
  margin-top: 1%;
  margin-left: 2%;
  color: red;
`;
const Button = styled.button`
  background: #1b4c5a;
  color: white;
  width: 100%;
  height: 3rem;
  margin-top: 2rem;
  font-weight: bold;
`;
const Input = styled.div`
  width: 100%;
  position: relative;
`;
const EyeSlash = styled.image`
  width: 100%;
  display: flex;
  position: absolute;
  transfrom: translateY(-50%);
  top: 5%;
  left: 90%;
  @media (max-width: 500px) {
    left: 85%;
  }
`;

const EyeSlash2 = styled.image`
  width: 100%;
  display: flex;
  position: absolute;
  transfrom: translateY(-50%);
  top: 77%;
  left: 90%;
  @media (max-width: 500px) {
    left: 85%;
    top: 73%;
  }
`;
const BackArrow = styled.image`
  display: flex;
  position: absolute;
  max-width: 100%;
  top: 6%;
  left: 3%;
`;

function ResetPassword(this: any) {
  const navigate = useNavigate();
  // useState variables
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
    showPassword: false,
    showPassword2: false,
  });

  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  // handling the show password icons
  const handleClickShowPassword = () => {
    setInput({ ...input, showPassword: !input.showPassword });
  };
  const handleClickShowPassword2 = () => {
    setInput({ ...input, showPassword2: !input.showPassword2 });
  };
  // checking whether passwords match and if they meet requirements (only requirement so far is <5char)
  const validateInput = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setError((prev) => {
      const stateObj = { ...prev, [name]: "" };

      switch (name) {
        case "password":
          if (input.confirmPassword && value !== input.confirmPassword) {
            stateObj.confirmPassword = "Passwords do not match.";
          } else {
            stateObj.confirmPassword = input.confirmPassword
              ? ""
              : error.confirmPassword;
          }
          break;
        case "confirmPassword":
          if (!value) {
            stateObj.confirmPassword = "Please confirm password.";
          } else if (input.password && value !== input.password) {
            stateObj.confirmPassword = "Passwords do not match.";
          } else if (
            input.password &&
            value === input.password &&
            input.password.length < 8
          ) {
            stateObj.confirmPassword = "must be more than 8 characters";
          }

          break;
        default:
          break;
      }
      return stateObj;
    });
  };
  // helper function for validating the input
  const onInputChange = (e: { target: any }) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
    validateInput(e);
  };
  // changes windows to different pages
  const handleClick = () => {
    if (input.confirmPassword === input.password && input.password.length > 5) {
      navigate("/success/reset");
    }
  };
  const handleBackClick = () => {
    navigate("/enterCode");
  };

  return (
    // wrapper centers everything it wraps
    <Wrapper>
      <BackArrow onClick={handleBackClick}>
        <img src={backArrow} alt="didn't work" />
      </BackArrow>
      <Box>
        <Header>Create New Password</Header>
        <Header2>
          Your new password must be different from previous used passwords
        </Header2>
        <NewP>
          <NewPTxt>New Password</NewPTxt>
          {/* wrapper for my input */}
          <Input>
            {/* if show password is true then change type to text */}
            <StyledInput
              type={input.showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter Password"
              value={input.password}
              onChange={onInputChange}
              onBlur={validateInput}
              required
            />
            {/* changes the truth value of show password */}
            <EyeSlash onClick={handleClickShowPassword}>
              <img src={eyeSlash} alt="didn't work" />
            </EyeSlash>
            {error.password && <ErrorMess>{error.password}</ErrorMess>}
            <NewPTxt>Confirm New Password</NewPTxt>
            <StyledInput2
              type={input.showPassword2 ? "text" : "password"}
              name="confirmPassword"
              placeholder="Confirm Password"
              value={input.confirmPassword}
              onChange={onInputChange}
              onBlur={validateInput}
              required
            />
            <EyeSlash2 onClick={handleClickShowPassword2}>
              <img src={eyeSlash} alt="didn't work" />
            </EyeSlash2>
            {/* displays error message when input doesn't meet requirements */}
            {error.confirmPassword && (
              <ErrorMess>{error.confirmPassword}</ErrorMess>
            )}
          </Input>
        </NewP>
        <Button onClick={handleClick}>Submit</Button>
      </Box>
    </Wrapper>
  );
}

export default ResetPassword;
