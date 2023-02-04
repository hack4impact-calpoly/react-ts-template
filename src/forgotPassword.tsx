import React, { ChangeEvent, useState } from "react";
import "./forgotPassword.css";
import arrow_pic from "./images/Arrow.png";
import "@fontsource/rubik";
import "@fontsource/roboto";

function sendEmail() {
  alert("You clicked Send");
}

function sendEmailArrow() {
  alert("You clicked the Arrow");
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
    <div className="large">
      <button type="button" className="arrowButton" onClick={sendEmailArrow}>
        <img className="arrow_" src={arrow_pic} alt="Arrow" />
      </button>
      <div className="fg_card">
        <div className="fg_box">
          <div className="insidefpPanel">
            <div className="fg_text">Forgot Password</div>
            <div className="fg_body_text">
              Please enter the email associated with your account to receive a
              reset link.
            </div>
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
            </div>
            <form>
              <button type="button" className="sendButton" onClick={sendEmail}>
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
