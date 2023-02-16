import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import { Amplify } from "aws-amplify";
import awsconfig from "./aws-exports";
import Success from "./success";
import ResetPassword from "./resetPassword";
import CreateAccount from "./createAccount";
import EnterCode from "./enterCode";
import Login from "./login";
import ForgotPassword from "./forgotPassword";
import WeeklyView from "./weeklyView";

Amplify.configure(awsconfig);
// import Home from "./home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* /, /login, /create-account, /forgot-password, /enter-code, /reset-password, /success */}
        <Route path="/" element={<WeeklyView startDate={new Date()} />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/enter-code" element={<EnterCode />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/success/:id" element={<Success />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
