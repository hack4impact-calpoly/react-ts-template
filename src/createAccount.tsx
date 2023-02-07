import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import styled from "styled-components";
import eyeSlash from "./images/EyeSlash.png";
import backArrow from "./images/Back Arrow.png";

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10% 10%;
`;

const Box = styled.section`
  box-sizing: border-box;
  font-family: "Rubik", sans-serif;
  width: 75%;
  text-align: left;
  display: flex;
  flex-direction: column;
  background: #fefefe;
  border: 0.5px solid #c4c4c4;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  padding: 3rem 5rem;
  @media (max-width: 630px) {
    display: flex;
    width: 100%;
    border: none;
    box-shadow: none;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-content: center;
    padding: 1rem;
    margin-top: auto;
  }
`;

const ErrorMess = styled.text`
  font-size: 15px;
  position: relative;
  color: red;
`;

const Button = styled.button`
  background: #1b4c5a;
  border: solid 0.5px #6c6b6b;
  color: white;
  width: 100%;
  height: 2.8rem;
  font-weight: bold;
  align-self: center;
  cursor: pointer;
`;

const Header = styled.text`
  line-height: 2rem;
  color: #011338;
  font-size: 25px;
  padding-bottom: 5%;
  @media (max-width: 630px) {
    margin: 2rem 0rem;
    padding: auto;
    width: fit-content;
    align-self: center;
  }
`;

const Txt = styled.text`
  font-size: 1.125rem;
`;

const StyledInput = styled.input`
  box-sizing: border-box;
  border: 1px solid rgba(143, 143, 143, 0.6);
  width: 100%;
  display: flex;
  height: 3rem;
  margin-bottom: 5%;
  font-size: 15px;
`;

const StyledSelect = styled.select`
  box-sizing: border-box;
  border: 1px solid rgba(143, 143, 143, 0.6);
  width: 100%;
  display: flex;
  height: 3rem;
  margin-bottom: 5%;
  color: gray;
  font-size: 15px;
`;

const Already = styled.text`
  position: absolute;
  font-size: 0.9rem;
  right: 5px;
  top: 100%;
  padding-top: 5px;
`;

const EyeSlash = styled.image`
  cursor: pointer;
  position: absolute;
  right: 2px;
  top: 7px;
  bottom: 3px;
  margin: 0;
  padding: 0 10px;
`;

const BackArrow = styled.image`
  position: absolute;
  top: 6%;
  left: 3%;
  cursor: pointer;
`;

const Container = styled.div`
  width: 100%;
  position: relative;
`;

const NameFields = styled.section`
  display: flex;
  flex-direction: row;
  margin-bottom: 3%;
  width: 100%;
  @media (max-width: 630px) {
    flex-direction: column;
    margin-bottom: 0%;
  }
`;

const FirstName = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-right: 5%;
  @media (max-width: 630px) {
    margin-right: 0%;
  }
`;

const LastName = styled.section`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-left: 5%;
  @media (max-width: 630px) {
    margin-left: 0%;
  }
`;

const StyledLink = styled(Link)`
  font-weight: bold;
  color: black;
  text-decoration: none;
`;

export default function CreateAccount() {
  const [role, setRole] = useState("none");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    setError("");

    if (
      !firstName ||
      !lastName ||
      !email ||
      !phone ||
      !password ||
      role === "none"
    ) {
      setError("All fields are required");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!emailRegex.test(email)) {
      setError("Invalid email address");
      return;
    }

    const phoneRegex = /^(\+0?1\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/;
    if (!phoneRegex.test(phone)) {
      setError("Invalid phone number");
      return;
    }

    // Call the API to create an account with email and password
    // if response is ok then navigate
    navigate("/success?from=createAccount");
  };

  return (
    <Wrapper>
      <BackArrow onClick={() => navigate("/login")}>
        <img src={backArrow} alt="backArrow" />
      </BackArrow>
      <Box>
        <Header>Create an Account</Header>
        <Txt>I am a:</Txt>
        <StyledSelect
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="none" selected disabled>
            Please Select...
          </option>
          <option value="Volunteer">Volunteer</option>
          <option value="Rider">Rider</option>
        </StyledSelect>
        <NameFields>
          <FirstName>
            <Txt>First Name</Txt>
            <StyledInput
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FirstName>
          <LastName>
            <Txt>Last Name</Txt>
            <StyledInput
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </LastName>
        </NameFields>
        <Txt>Email</Txt>
        <StyledInput
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Txt>Phone</Txt>
        <StyledInput
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Txt>Password</Txt>
        <Container>
          <StyledInput
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <EyeSlash onClick={() => setShowPassword(!showPassword)}>
            <img src={eyeSlash} alt="eyeSlash" />
          </EyeSlash>
        </Container>
        {error && <ErrorMess>{error}</ErrorMess>}
        <Container>
          <Button onClick={handleSubmit}>Sign Up</Button>
          <Already>
            Already have an account? <StyledLink to="/login">Log In</StyledLink>
          </Already>
        </Container>
      </Box>
    </Wrapper>
  );
}
