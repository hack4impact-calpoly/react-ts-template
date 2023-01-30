/*
make login in button work
can't get rubik font to show up
validate email
validate password
*/

import React, { ChangeEvent, useState } from "react";
import "./login.css";
import logoPic from "./images/PET logo.jpg";

function forgotPassword() {
  alert("You clicked login");
}
function addAccount() {
  alert("You clicked login");
}
function noAccount() {
  alert("You noAccount");
}

const App = () => {
    const [values, setValues] = React.useState({
      password: "",
      showPassword: false,
    });
    
    const handleClickShowPassword = () => {
      setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };
    
    const handlePasswordChange = (prop) => (event) => {
      setValues({ ...values, [prop]: event.target.value });
    };

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="login_card">
      <div className="logo">
        <img className="logo" src={logoPic} alt="PET logo" />
      </div>
      <div>
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
        <input
          placeholder=""
          value={password} // add newPassword as the input's value
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            // this event handler updates the value of newIngredient
            setPassword(e.target.value);
          }}
        />
        <form>
          <button
            type="button"
            className="accountAdjustButton"
            onClick={forgotPassword}
          >
            Forgot Password?
          </button>
        </form>
      </div>
      <img
        className="eyeSlash"
        src="www.figma.com/file/OIkY5AHFB9xlkgDr7zHbqA/PET?node-id=95%3A1891&t=F5bRoR8q0QIzziqA-4"
        alt="eyeslash"
      />

      <form>
        <button type="button" className="loginButton" onClick={addAccount}>
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
  );
}
