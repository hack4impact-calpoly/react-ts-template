/*
make login in button work
can't get rubik font to show up
validate email
validate password
*/

import React, { ChangeEvent, useState } from "react";
import "./login.css";
import logoPic from "./images/PET logo.jpg";
import { ReactComponent as EyeSlashPic } from "./images/eyeSlash.svg";

function forgotPassword() {
  alert("You clicked login");
}
function addAccount() {
  alert("You clicked login");
}
function noAccount() {
  alert("You noAccount");
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
            <h1>Email</h1>
            <input
              placeholder=""
              value={email} // add newEmail as the input's value
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                // this event handler updates the value of newIngredient
                setEmail(e.target.value);
              }}
            />
            <h1>Password</h1>

            <div>
              <input type={passwordShown ? "text" : "password"} />
              <button
                type="button"
                className="eyeSlash"
                onClick={togglePassword}
              >
                <EyeSlashPic />
              </button>
            </div>
            <form>
              <button
                type="button"
                className="accountAdjustButton"
                onClick={forgotPassword}
              >
                Forgot Password?
              </button>
            </form>

            <form>
              <button
                type="button"
                className="loginButton"
                onClick={addAccount}
              >
                Log In
              </button>
            </form>

            <form>
              <button
                type="button"
                className="accountAdjustButton"
                onClick={noAccount}
              >
                Don&apos;t have an account? Create Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
