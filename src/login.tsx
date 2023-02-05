/*
validated email and password
password must have 1 uppercase, lowercase, number and special character
password must be eight characters long
password validation commented out
*/

import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import "./login.css";
import logoPic from "./images/PET logo.jpg";
import { ReactComponent as EyeSlashPic } from "./images/eyeSlash.svg";
import "@fontsource/rubik";

// const Input = styled.input`
//   align-self: left;
//   line-height: 400%;
//   width: 99%;
//   left: 500%;
// `;

const Button = styled.button`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 100%;
  line-height: 100%;
  justify-content: flex-end;
  color: #000000;
  > .eyeSlash {
    border-width: 0%;
    background: white;
    border: none;
    cursor: pointer;
    margin-right: 1%;
    z-index: 1;
  }
`;

const Section = styled.div`
  > .loginCard {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  > .loginBox {
    flex-direction: column;
    /* width: 640px; */
    width: 45%;
    height: auto;
    border: 1px solid #c4c4c4;
    padding: 0%;
    align-content: stretch;
    align-items: center;
  }
  > .insideLoginPanel {
    align-items: center;
    justify-content: center;
    flex-direction: column;
    align-content: stretch;
    padding-left: 15%;
    padding-right: 15%;
    padding-top: 5%;
    padding-bottom: 5%;
  }
  > .logo {
    display: flex;
    margin: auto;
    /* PET_FINAL logo 1 */
    width: 60%;
    height: 70%;
  }
  > .beneathLogo {
    display: flex;
    flex-wrap: wrap;
    flex-direction: column;
    align-content: stretch;
    padding: -100%;
  }
  > .textInput {
    padding-top: 5%;
    padding-bottom: 5%;
    cursor: text;
  }
  > .invalidAlert {
    border: red;
  }
`;
const Title = styled.text`
  > .boldAccount {
    font-weight: bold;
  }
`;

const SmallText = styled.h1`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  /* font-size: 18px;
    line-height: 21px; */
  font-size: 112.5%;
  line-height: 131.25%;
  color: #011338;
`;

function addAccount() {
  alert("You clicked login");
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const [validEmail, setValidEmail] = React.useState(false);
  // const [validPw, setValidPw] = React.useState(false);
  const handleOnChangeEmail = (email1: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    //   re.test(email) ? setValid(true) : setValid(false);
    if (re.test(email1)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };
  // const handleOnChangePw = (pw: string) => {
  //   const re =
  //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  //   //   re.test(email) ? setValid(true) : setValid(false);
  //   if (re.test(pw)) {
  //     setValidPw(false);
  //   } else {
  //     setValidPw(true);
  //   }
  // };

  return (
    <Section>
      <Section className="loginCard">
        <Section className="loginBox">
          <Section className="insideLoginPanel">
            <Section className="logo">
              <img className="logo" src={logoPic} alt="PET logo" />
            </Section>
            <Section className="beneathLogo">
              <Section>
                <Section
                  className="invalidAlert"
                  style={{ display: validEmail ? "block" : "none" }}
                >
                  {" "}
                  Invalid email. Please try again.
                </Section>
                {/* <div style={{ display: validPw ? "block" : "none" }}>
                invalid password
              </div> */}
              </Section>
              <Section className="textInput">
                <SmallText>Email</SmallText>
                <input
                  placeholder=""
                  type="email"
                  value={email} // add newEmail as the input's value
                  onChange={(e: ChangeEvent<HTMLInputElement>) => {
                    // this event handler updates the value of newIngredient
                    setEmail(e.target.value);
                  }}
                  onClick={(e) => {
                    e.currentTarget.scrollLeft = e.currentTarget.scrollWidth;
                    e.currentTarget.setSelectionRange(
                      e.currentTarget.value.length,
                      e.currentTarget.value.length
                    );
                  }}
                  onBlur={() => {
                    handleOnChangeEmail(email);
                  }}
                />
                {/* if (touched){handleOnChange(email)} */}
                <SmallText>Password</SmallText>
                <div className="password inputBlur">
                  <Button
                    type="button"
                    className="eyeSlash"
                    onClick={togglePassword}
                  >
                    <EyeSlashPic />
                  </Button>

                  <input
                    type={passwordShown ? "text" : "password"}
                    className="passwordInput"
                    value={password}
                    onChange={(e: ChangeEvent<HTMLInputElement>) => {
                      // this event handler updates the value of newIngredient
                      setPassword(e.target.value);
                    }}
                    onFocus={(e) => {
                      e.currentTarget.parentElement?.classList.remove(
                        "inputBlur"
                      );
                      e.currentTarget.parentElement?.classList.add(
                        "inputFocus"
                      );
                    }}
                    onBlur={(e) => {
                      e.currentTarget.parentElement?.classList.remove(
                        "inputFocus"
                      );
                      e.currentTarget.parentElement?.classList.add("inputBlur");
                      // handleOnChangePw(email);
                    }}
                    onClick={(e) => {
                      e.currentTarget.scrollLeft = e.currentTarget.scrollWidth;
                      e.currentTarget.setSelectionRange(
                        e.currentTarget.value.length,
                        e.currentTarget.value.length
                      );
                    }}
                  />
                </div>
                <Button
                  as="a"
                  href="google.com"
                  className="accountAdjustButton"
                >
                  <div className="fgPw">
                    <h1 className="boldAccount">Forgot password?</h1>
                  </div>
                </Button>
              </Section>
              <form>
                <button
                  type="button"
                  className="loginButton"
                  onClick={addAccount}
                >
                  Log In
                </button>
              </form>
              <p>
                <Button as="a" href="google.com">
                  <div className="accountAdjust">
                    Don&apos;t have an account?&nbsp;
                    <Title className="boldAccount">Create Account</Title>
                  </div>
                </Button>
              </p>
            </Section>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
