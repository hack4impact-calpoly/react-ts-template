import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "aws-amplify";
import eyeSlash from "../images/eyeSlash.svg";
import eye from "../images/eye.svg";
import backArrow from "../images/backArrow.png";
import {
  Wrapper,
  Box,
  BackArrow,
  Button,
  Header,
  Input,
  Description,
  Label,
  PasswordContainer,
  EyeSlash,
  ErrorMessage,
} from "./styledComponents";

export default function ResetPassword(this: any) {
  const navigate = useNavigate();
  // useState variables
  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
    // showPassword: false,
    // showPassword2: false,
    code: "",
  });
  // const [showPassword, setShowPassword] = useState(false);
  const [passwordShown, setPasswordShown] = useState(false);
  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };
  const [passwordShown1, setPasswordShown1] = useState(false);
  // Password toggle handler
  const togglePassword1 = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown1(!passwordShown1);
  };
  const [error, setError] = useState({
    password: "",
    confirmPassword: "",
  });
  // handling the show password icons
  // const handleClickShowPassword = () => {
  //   // get rid of this later too
  //   const username = "igloo405@gmail.com";
  //   // get rid of this later this should be in enter code
  //   // Send confirmation code to user's email
  //   Auth.forgotPassword(username)
  //     // eslint-disable-next-line no-console
  //     .then((data) => console.log(data))
  //     // eslint-disable-next-line no-console
  //     .catch((err) => console.log(err));
  //   setInput({ ...input, showPassword: !input.showPassword });
  // };
  // const handleClickShowPassword2 = () => {
  //   setInput({ ...input, showPassword2: !input.showPassword2 });
  // };
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
    const username = "igloo405@gmail.com";
    // const code = "094d9e8b-7a16-410d-869a-dc4ffec62829";
    if (
      input.confirmPassword === input.password &&
      input.password.length > 8 &&
      input.code.length > 0
    ) {
      // Collect confirmation code and new password, then
      Auth.forgotPasswordSubmit(username, input.code, input.password)
        // eslint-disable-next-line no-console
        .then((data) => console.log(data))
        // eslint-disable-next-line no-console
        .catch((err) => console.log(err));

      // DELETE THESE CONSOLE STATEMENTS LATER
      // eslint-disable-next-line no-console
      console.log("nice");
      // eslint-disable-next-line no-console
      console.log(input.code);

      navigate("/success/reset");
    }
  };
  const handleBackClick = () => {
    navigate("/enter-code");
  };

  return (
    // wrapper centers everything it wraps
    <Wrapper>
      <BackArrow src={backArrow} alt="didn't work" onClick={handleBackClick} />
      <Box>
        <Header>Create New Password</Header>
        <Description>
          Your new password must be different from previous used passwords
        </Description>
        <Label>Verification Code</Label>
        <Input
          type="text"
          name="code"
          placeholder="Enter Code"
          value={input.code}
          onChange={(e) =>
            setInput((prev) => ({ ...prev, code: e.target.value }))
          }
          required
        />
        {/* if show password is true then change type to text */}
        <Label>New Password</Label>
        <PasswordContainer>
          <Input
            type={passwordShown ? "text" : "password"}
            name="password"
            placeholder="Enter Password"
            value={input.password}
            onChange={onInputChange}
            onBlur={validateInput}
            required
          />
          {/* changes the truth value of show password */}
          <EyeSlash onClick={togglePassword}>
            {passwordShown ? (
              <img src={eye} alt="did work" />
            ) : (
              <img src={eyeSlash} alt="didn't work" />
            )}
          </EyeSlash>
        </PasswordContainer>
        {error.password && <ErrorMessage>{error.password}</ErrorMessage>}
        <Label>Confirm New Password</Label>
        <PasswordContainer>
          <Input
            type={passwordShown1 ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm Password"
            value={input.confirmPassword}
            onChange={onInputChange}
            onBlur={validateInput}
            required
          />
          <EyeSlash onClick={togglePassword1}>
            {passwordShown1 ? (
              <img src={eye} alt="did work" />
            ) : (
              <img src={eyeSlash} alt="didn't work" />
            )}
          </EyeSlash>
        </PasswordContainer>
        {/* displays error message when input doesn't meet requirements */}
        {error.confirmPassword && (
          <ErrorMessage>{error.confirmPassword}</ErrorMessage>
        )}
        <Button onClick={handleClick}>Submit</Button>
      </Box>
    </Wrapper>
  );
}
