import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import Success from "./components/success";
import ResetPassword from "./components/resetPassword";
import CreateAccount from "./components/createAccount";
import EnterCode from "./components/enterCode";
import Login from "./components/login";
import ForgotPassword from "./components/forgotPassword";
import WeeklyView from "./components/weeklyView";
import TimeslotMobileContent from "./components/timeslotMobileContent";
import AppointmentPopup from "./components/appointmentPopup";
import WeeklyViewMobile from "./components/weeklyViewMobile";
import MonthlyView from "./components/monthlyView";

Amplify.configure(awsconfig);

function App() {
  const [email, setEmailProp] = useState<string>();
  const [user] = useState<string>();
  const [bookings] = useState<number>();

  return (
    <BrowserRouter>
      <Routes>
        {/* /, /login, /create-account, /forgot-password, /enter-code, /reset-password, /success */}
        <Route path="/" element={<WeeklyView startDate={new Date()} />} />
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
        {/* delete these later */}
        <Route
          path="/timeslotMobile"
          element={<TimeslotMobileContent user={user!} bookings={bookings!} />}
        />
        <Route
          path="/weeklyViewMobile"
          element={<WeeklyViewMobile startDate={new Date()} />}
        />
        <Route path="/apptPopUp" element={<AppointmentPopup />} />
        <Route path="/MonthlyView" element={<MonthlyView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
