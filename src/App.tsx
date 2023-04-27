import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Amplify, DataStore } from "aws-amplify";
// import { DataStore } from "@aws-amplify/datastore";
import { LazyTimeslot, Timeslot } from "./models";
import awsconfig from "./aws-exports";
import Success from "./components/authentication/success";
import ResetPassword from "./components/authentication/resetPassword";
import CreateAccount from "./components/authentication/createAccount";
import EnterCode from "./components/authentication/enterCode";
import Login from "./components/authentication/login";
import ForgotPassword from "./components/authentication/forgotPassword";
import Timeslots from "./components/popup/timeslots";
import Calendar from "./components/calendar";
import CalendarMobile from "./components/mobile/mobileCalendar";
import MobileTimeslots from "./components/mobile/mobileTimeslots";
import TimeslotSuccess from "./components/popup/timeslotSuccess";
import TimeSlotConfirmation from "./components/popup/timeslotConfirmation";

Amplify.configure(awsconfig);

function App() {
  const [email, setEmailProp] = useState<string>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [timeslots, setTs] = useState<LazyTimeslot[]>([]);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.outerWidth <= 500);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const pullData = async () => {
      const ts = await DataStore.query(Timeslot);
      setTs(ts);
      console.log(ts);
      console.log(new Date("July 4 1776 14:30"));
    };

    pullData();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* /, /login, /create-account, /forgot-password, /enter-code, /reset-password, /success */}
        <Route
          path="/"
          element={isMobile ? <CalendarMobile /> : <Calendar />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/enter-code" element={<EnterCode />} />
        <Route
          path="/forgot-password"
          element={<ForgotPassword setEmailProp={setEmailProp} />}
        />
        <Route
          path="/reset-password"
          element={<ResetPassword email={email!} />}
        />
        <Route path="/success/:id" element={<Success />} />
        <Route
          path="/timeslots"
          element={<Timeslots userType="rider" models={timeslots} />}
        />
        <Route
          path="/mobile-timeslots"
          element={<MobileTimeslots userType="rider" models={timeslots} />}
        />
        <Route path="/timeslot-success" element={<TimeslotSuccess />} />
        <Route
          path="/timeslot-confirmation"
          element={<TimeSlotConfirmation userType="rider" status="book" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
