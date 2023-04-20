import { useEffect } from "react";
import { DataStore } from "@aws-amplify/datastore";
import { Timeslot } from "../../models";
import MobileWeeklyView from "./mobileWeeklyView";

export default function CalendarMobile() {
  useEffect(() => {
    const pullData = async () => {
      const models = await DataStore.query(Timeslot);
      console.log(models);
    };

    pullData();
  }, []);

  return (
    <div>
      <MobileWeeklyView startDate={new Date()} />
    </div>
  );
}
