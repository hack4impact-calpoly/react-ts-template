import { ChangeEvent, useState } from "react";
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
            <div className="textInput">
              <h1>Email</h1>
              <input
                placeholder=""
                value={email} // add newEmail as the input's value
                onChange={(e: ChangeEvent<HTMLInputElement>) => {
                  // this event handler updates the value of newIngredient
                  setEmail(e.target.value);
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
