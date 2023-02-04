/*
validated email and password
password must have 1 uppercase, lowercase, number and special character
password must be eight characters long
password validation commented out
*/

import React, { ChangeEvent, useState } from "react";
import "./login.css";
import logoPic from "./images/PET logo.jpg";
import { ReactComponent as EyeSlashPic } from "./images/EyeSlash.svg";
import "@fontsource/rubik";

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
    <div className="login_card">
      <div className="login_box">
        <div className="insideLoginPanel">
          <div className="logo">
            <img className="logo" src={logoPic} alt="PET logo" />
          </div>
          <div className="beneathLogo">
            <div>
              <div
                className="invalidAlert"
                style={{ display: validEmail ? "block" : "none" }}
              >
                {" "}
                Invalid email. Please try again.
              </div>
              {/* <div style={{ display: validPw ? "block" : "none" }}>
                invalid password
              </div> */}
            </div>
            <div className="textInput">
              <h1>Email</h1>
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
              <h1>Password</h1>
              <div className="password inputBlur">
                <button
                  type="button"
                  className="eyeSlash"
                  onClick={togglePassword}
                >
                  <EyeSlashPic />
                </button>

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
                    e.currentTarget.parentElement?.classList.add("inputFocus");
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
              <a href="google.com" className="accountAdjustButton">
                <div className="fgPw">
                  <div className="boldAccount">Forgot password?</div>
                </div>
              </a>
            </div>
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
              <a href="google.com">
                <div className="accountAdjustButton">
                  Don&apos;t have an account?&nbsp;
                  <div className="boldAccount">Create Account</div>
                </div>
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
