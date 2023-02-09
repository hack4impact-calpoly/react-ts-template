import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import "./login.css";
import logoPic from "./images/PET logo.jpg";
import { ReactComponent as EyeSlashPic } from "./images/eyeSlash.svg";
import "@fontsource/rubik";

const Input = styled.input`
  align-self: left;
  line-height: 400%;
  width: 99%;
  left: 500%;
`;

const PasswordInput = styled(Input)`
  margin: 0%;
  flex: 1;
  width: 100%;
  z-index: 0;
  border: none;
  outline: none !important;
  background: none;
`;

const Button = styled.button`
  display: flex;
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 100%;
  line-height: 100%;
  justify-content: flex-end;
  color: #000000;
  text-decoration: none;
  @media (max-width: 500px) {
    font-size: 80%;
    font-weight: bold;
  }
`;

const TomatoButton = styled(Button)`
  border-width: 0%;
  background: white;
  border: none;
  cursor: pointer;
  margin-right: 1%;
  z-index: 1;
`;

const LoginButton = styled(Button)`
  align-self: center;
  text-align: center;
  /* login button font */
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 100%;
  line-height: 300%;
  color: #ffffff;
  /* button size*/
  width: 100%;
  height: 100%;
  /* Brand color 1 */
  background: #1b4c5a;
  cursor: pointer;
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
    @media (max-width: 500px) {
      width: auto;
      border: 0;
    }
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
  > .password {
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
    border: 1px solid black;
  }
`;
const Title = styled.text`
  font-weight: bold;
  padding: 0%;
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

// const Paragraph = styled.h3`
//   font-weight: bold;
// `;

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
                <Input
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
                <Section className="password">
                  <TomatoButton
                    type="button"
                    className="eyeSlash"
                    onClick={togglePassword}
                  >
                    <EyeSlashPic />
                  </TomatoButton>

                  <PasswordInput
                    type={passwordShown ? "text" : "password"}
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
                </Section>
                <Button
                  as="a"
                  href="google.com"
                  className="accountAdjustButton"
                >
                  <p>
                    <Title className="boldAccount">Forgot password?</Title>
                  </p>
                </Button>
              </Section>
              <form>
                <LoginButton
                  type="button"
                  className="loginButton"
                  onClick={addAccount}
                >
                  Log In
                </LoginButton>
              </form>
              <p>
                <Button as="a" href="google.com">
                  <Section className="accountAdjust">
                    Don&apos;t have an account?&nbsp;
                    <Title className="boldAccount">Create Account</Title>
                  </Section>
                </Button>
              </p>
            </Section>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
