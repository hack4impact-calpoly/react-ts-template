/*
make login in button work
can't get rubik font to show up
validate email
validate password
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
  // Initialize a boolean state
  const [passwordShown, setPasswordShown] = useState(false);

  // Password toggle handler
  const togglePassword = () => {
    // When the handler is invoked
    // inverse the boolean state of passwordShown
    setPasswordShown(!passwordShown);
  };

  return (
    <div className="login_card">
      <div className="login_box">
        <div className="insideLoginPanel">
          <div className="logo">
            <img className="logo" src={logoPic} alt="PET logo" />
          </div>
          <div className="beneathLogo">
            <div className="textInput">
              <h1>Email</h1>
              <input
                placeholder=""
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
              />
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
                  onFocus={(e) => {
                    e.currentTarget.parentElement?.classList.remove(
                      "inputBlur"
                    );
                    e.currentTarget.parentElement?.classList.add("inputFocus");
                    // e.selectionSet=true;
                  }}
                  onBlur={(e) => {
                    e.currentTarget.parentElement?.classList.remove(
                      "inputFocus"
                    );
                    e.currentTarget.parentElement?.classList.add("inputBlur");
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
