import React from "react";
import WeeklyMobile from "./weeklyViewMobile";

export default function CalendarMobile() {
  return (
    <div>
      <WeeklyMobile startDate={new Date()} />
    </div>
  );
}
