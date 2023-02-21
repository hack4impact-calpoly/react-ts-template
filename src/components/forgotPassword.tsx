import React, { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import arrow from "../images/backArrow.png";
import {
  Wrapper,
  Box,
  BackArrow,
  Button,
  Header,
  Description,
  Input,
  Label,
  ErrorMessage,
} from "./styledComponents";

function sendEmail() {
  alert("You clicked Send");
}

export default function forgotPassword() {
  const [email, setEmail] = useState("");

  const [validEmail, setValidEmail] = React.useState(false);

  const handleOnChangeEmail = (email1: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(email1)) {
      setValidEmail(false);
    } else {
      setValidEmail(true);
    }
  };

  return (
    <Wrapper>
      <Link to="/login">
        <BackArrow src={arrow} />
      </Link>
      <Box>
        <Header>Forgot Password</Header>
        <Description>
          Please enter the email associated with your account to receive a reset
          link.
        </Description>
        {validEmail && (
          <ErrorMessage>Invalid email. Please try again.</ErrorMessage>
        )}
        <Label>Email</Label>
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
        <Button type="button" className="sendButton" onClick={sendEmail}>
          Send
        </Button>
      </Box>
    </Wrapper>
  );
}
