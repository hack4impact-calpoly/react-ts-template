import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import arrow_pic from "../images/Arrow.png";
import "@fontsource/rubik";
import "@fontsource/roboto";

const Button = styled.button`
  scale: 25%;
  margin-top: -5%;
  margin-left: -6%;
  outline: none;
  background-color: white;
  border: none;
  @media (max-width: 500px) {
    margin-top: -20%;
    margin-left: -30%;
  }
`;

const TomatoButton = styled.button`
  align-self: center;
  /* login button font */
  font-family: "Rubik";
  font-style: normal;
  font-weight: 500;
  font-size: 100%;
  line-height: 300%;
  text-align: center;
  color: #ffffff;
  /* button size*/
  width: 92%;
  height: 100%;
  /* Brand color 1 */
  background: #1b4c5a;
  cursor: pointer;
`;

const Section = styled.div`
  > .fgCard {
    display: flex;
    align-items: center;
    justify-content: center;
    @media (max-width: 500px) {
      margin-top: -10%;
    }
  }
  > .fgBox {
    margin-top: -10%;
    flex-direction: column;
    width: auto;
    height: auto;
    border: 1px solid #c4c4c4;
    padding: 0%;
    align-content: stretch;
    align-items: center;

    @media (max-width: 500px) {
      border: none;
      //   margin-top: -20%;
      //   margin-left: -20%;
    }
  }
  > .insidefpPanel {
    display: flex;
    /* align-items: center; */
    justify-content: center;
    flex-direction: column;
    align-content: stretch;
    padding: 10%;
    padding-left: 15%;
    padding-bottom: 15%;
  }
  > .textInput {
    padding-top: 5%;
    padding-bottom: 5%;
    cursor: text;
  }
`;

const LargeText = styled.text`
  display: flex;
  padding-bottom: 5%;
  cursor: text;

  font-family: "Roboto";
  font-style: normal;
  font-weight: 500;
  /* font-size: 40px; */
  font-size: 280%;
  /* line-height: 47px; */
  line-height: 100%;
  color: #011338;
  @media (max-width: 500px) {
    font-family: "Rubik";
    font-style: normal;
    font-weight: 600;
    font-size: 24px;
    line-height: 28px;
  }
`;

const Title = styled.text`
  font-family: "Rubik";
  font-style: normal;
  font-weight: 400;
  font-size: 110%;
  /* line-height: 27px; */
  line-height: 150%;
  /* or 135% */
  color: #000d26;
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

const Input = styled.input`
  align-self: left;
  /* height: 55px;
  width: 436px;
  left: 538px; */
  line-height: 400%;
  width: 90%;
  left: 500%;
`;

function sendEmail() {
  alert("You clicked Send");
}

export default function forgotPassword() {
  const [email, setEmail] = useState("");

  const [validEmail, setValidEmail] = React.useState(false);

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

  return (
    <Section>
      <Button>
        <Link to="/login">
          <img className="arrow_" src={arrow_pic} alt="Arrow" />
        </Link>
      </Button>
      <Section className="fgCard">
        <Section className="fgBox">
          <Section className="insidefpPanel">
            <LargeText>Forgot Password</LargeText>
            <Title className="fgBodyText">
              Please enter the email associated with your account to receive a
              reset link.
            </Title>
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
                className="invalidEmail"
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
            </Section>
            <form>
              <TomatoButton
                type="button"
                className="sendButton"
                onClick={sendEmail}
              >
                Send
              </TomatoButton>
            </form>
          </Section>
        </Section>
      </Section>
    </Section>
  );
}
