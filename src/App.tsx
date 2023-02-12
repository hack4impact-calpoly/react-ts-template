import React from "react";
import "./App.css";
import CalendarWeek from "./weeklyView";
// import Success from "./success";

function App() {
  return <CalendarWeek startDate={new Date()} />;
}

export default App;
