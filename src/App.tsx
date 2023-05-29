/* eslint-disable react/button-has-type */
import React, { useState, useEffect, useMemo } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import { Amplify, DataStore } from "aws-amplify";
import { LazyTimeslot, Timeslot, User as UserModel } from "./models";
import awsconfig from "./aws-exports";
import Timeslots from "./components/popup/timeslots";
import Calendar from "./components/calendar";
import CalendarMobile from "./components/mobile/mobileCalendar";
import UserContext from "./userContext";
import ForgotPassword from "./components/authentication/forgotPassword";
import ResetPassword from "./components/resetPassword";
import Login from "./components/authentication/login";
import CreateAccount from "./components/authentication/createAccount";
import EnterCode from "./components/authentication/enterCode";
import Success from "./components/authentication/success";
import MobileLogout from "./components/mobile/mobileLogout";

Amplify.configure(awsconfig);

function App() {
  const [email, setEmailProp] = useState<string>();
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // maybe i use this prop to pass into calendar mobile so that
  // mobile weekly view page will change it onclick which in turn
  // will change the current date

  const [day, setDayProp] = useState<string>();
  const [month, setMonthProp] = useState<string>();
  const [weekday, setWeekdayProp] = useState<string>();
  const [timeslots, setTs] = useState<LazyTimeslot[]>([]);

  // added additional attributes to the calendarmobile component for props

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.outerWidth <= 500);
    };
    const pullData = async () => {
      const ts = await DataStore.query(Timeslot);
      setTs(ts);
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    pullData();
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  // setting up context
  const [currentUser, setUser] = useState({} as UserModel[]);
  const userContextFields = useMemo(
    () => ({ currentUser, setUser }),
    [currentUser]
  );

  return (
    <UserContext.Provider value={userContextFields}>
      <BrowserRouter>
        <Routes>
          {/* Starting Protected Routes */}
          {/* If not logged in when trying to access below route, redirect to login */}
          {currentUser.length > 0 ? (
            <Route
              path="/"
              element={
                isMobile ? (
                  <CalendarMobile
                    bookingsFake={0}
                    day={day!}
                    setDayProp={setDayProp}
                    month={month!}
                    setMonthProp={setMonthProp}
                    weekday={weekday!}
                    setWeekdayProp={setWeekdayProp}
                  />
                ) : (
                  <Calendar />
                )
              }
            />
          ) : (
            <Route path="/login" element={<Login />} />
          )}
          {/* {currentUser ? (
            <Route
              path="/timeslot-confirmation"
              element={<TimeSlotConfirmation status="book" date={new Date()} />}
            />
          ) : (
            <Route path="/login" element={<Login />} />
          )} */}
          {/* {currentUser.length > 0 ? (
            <Route path="/timeslot-success" element={<TimeslotSuccess />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )} */}

          {currentUser.length > 0 ? (
            <Route path="/logout" element={<MobileLogout />} />
          ) : (
            <Route path="/login" element={<Login />} />
          )}

          {/* Starting Public Routes */}
          {/* Can access regardless of login status */}

          <Route path="/login" element={<Login />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/enter-code" element={<EnterCode />} />
          <Route path="/success/:id" element={<Success />} />
          <Route
            path="/forgot-password"
            element={<ForgotPassword setEmailProp={setEmailProp} />}
          />
          <Route
            path="/reset-password"
            element={<ResetPassword email={email!} />}
          />
          <Route path="/timeslots" element={<Timeslots models={timeslots} />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
