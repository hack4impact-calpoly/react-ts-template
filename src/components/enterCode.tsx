import styled from "styled-components";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import lock from "../images/lock.svg";
import arrow from "../images/Back Arrow.png";
import "@fontsource/rubik";

const Div = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10%;
`;
const Form = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 44.69rem;
  height: 32.88rem;
  color: #ffffff;
  border: 0.5px solid #c4c4c4;
  box-shadow: 0 10px 24px rgba(49, 77, 137, 0.1);
  font-family: "Rubik";
  padding: 3rem, 5rem;
  @media (max-width: 620px) {
    display: flex;
    border: none;
    box-shadow: none;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 32%;
  }
`;
const BackArrow = styled.img`
  position: absolute;
  top: 6%;
  left: 3%;
  cursor: pointer;
  @media (max-width: 620px) {
    top: 4%;
    left: 6%;
  }
`;
const Lock = styled.img`
  color: #011338;
  font-size: 2.5rem;
  font-weight: medium;
  margin: 4rem 0 2rem 0;
  @media (max-width: 620px) {
    display: none;
  }
`;
const Header = styled.text`
  color: #011338;
  font-size: 2.5rem;
  font-weight: bold;
  @media (max-width: 620px) {
    font-size: 2rem;
  }
`;
const Text = styled.p`
  color: #000d26;
  font-size: 1.05rem;
  margin: 1.5rem 3rem 1.5rem 3rem;
  @media (max-width: 620px) {
    margin: 1.5rem 0 1.5rem 0;
  }
`;
const AlignResend = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 0.5rem 0rem 1.25rem 0rem;
`;
const Input = styled.input`
  width: 29.5rem;
  height: 1.44rem;
  margin: 0 0 0.25rem 0;
  @media (max-width: 620px) {
    width: 20rem;
    height: 2rem;
  }n
`;
const Resend = styled.button`
  color: #000000;
  font-size: 0.9rem;
  font-weight: bold;
  cursor: pointer;
  background: none;
  border: none;
  &:hover {
    text-decoration: underline;
  }
`;
const Button = styled.text`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30rem;
  height: 2.7rem;
  margin: 0 0 2rem 0;

  background-color: #1b4c5a;
  color: #ffffff;
  font-size: 1.13rem;
  font-weight: medium;
  cursor: pointer;

  @media (max-width: 620px) {
    width: 20.5rem;
    height: 3rem;
    margin: 0rem;
  }
`;
const Mess = styled.p`
  color: red;
`;

// temporary email placeholder
const user = {
  email: "placeholder@gmail.com",
};

function EnterCode() {
  const navigate = useNavigate();
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  // code requirements (at least 8 characters for now)
  const codeValidation = () => {
    const regEx = /^.{8,}$/;
    if (regEx.test(code)) {
      setError("");
    } else if (!regEx.test(code)) {
      setError("Code is Invalid");
    }
  };
  // temporary alert (later verify if input code = sent code, then navigate to /success)
  const codeVerification = () => {
    alert("Verifying Code...");
    // navigate("./login");
  };
  // temporary alert (later resend code to email)
  const resendCode = () => {
    alert("Resent Code");
  };

  return (
    <Div>
      {/* <link
        href="https://fonts.googleapis.com/css?family=Rubik"
        rel="stylesheet"
      /> */}
      <Form>
        <BackArrow src={arrow} onClick={() => navigate("/login")} />
        <Lock src={lock} />
        <Header>Enter Code</Header>
        <Text>
          We’ve sent an email to {user.email} with your authentication code.
        </Text>
        <AlignResend>
          <Input
            value={code}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCode(e.target.value)
            }
            onBlur={() => codeValidation()}
          />
          <Resend onClick={resendCode}>Resend code</Resend>
        </AlignResend>
        <Button onClick={codeVerification}>Verify</Button>
        <Mess>{error}</Mess>
      </Form>
    </Div>
  );
}

export default EnterCode;
