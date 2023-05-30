/* eslint-disable no-console */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DataStore } from "@aws-amplify/datastore";
import UserContext from "../../userContext";
import MobileTimeslot from "./mobileTimeslot";
import { Booking, LazyTimeslot } from "../../models";

// added height and margin-top and changed overflowy to overflow-y
const Slots = styled.section`
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7%;
  margin-top: 10%;
  width: 100%;
  height: 400px;
`;

// interface TsData {
//   startTime: string;
//   endTime: string;
//   unavailableDates: (string | null)[] | null | undefined;
//   checked: false;
//   id: string;
// }

interface TimeslotsProps {
  models: LazyTimeslot[];
  date: Date;
}

export default function MobileTimeslots({ models, date }: TimeslotsProps) {
  // const filteredTimeslots = [];
  const currentUserFR = useContext(UserContext);
  const { currentUser } = currentUserFR;
  const [realUser] = currentUser;
  const { userType } = realUser;
  // const timeslots: TsData[] = [];
  const [timeslots, setTimeslots] = useState(models);
  const [bookings, setBookings] = useState<Booking[]>([]);
  // if (realUser !== null) {
  //   console.log("mobile timeslots component just needs userType");
  //   console.log(userType);
  // }
  // console.log(
  //   "I'm not using the date for now cause I'm tired but it is: ",
  //   date
  // );

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingModels = await DataStore.query(Booking);
        // console.log("BOOKINGS ---------", bookingModels);
        setBookings(bookingModels);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

  useEffect(() => {
    const update = async () => {
      try {
        // console.log("WE IN HERE UPDATING", date);
        await setTimeslots(timeslots);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    update();
  }, [date]);

  function mapTimeslotColors(timeslot: LazyTimeslot) {
    let backgroundColor = "#90BFCC";

    if (userType === "Rider" || userType === "Volunteer") {
      if (
        bookings.some(
          (booking) =>
            booking.timeslotID === timeslot.id &&
            date.getDate() ===
              Number(
                String(booking.date).substring(
                  String(booking.date).length - 2,
                  String(booking.date).length
                )
              )
        )
      ) {
        backgroundColor = "#E0EFF1";
      }
    } else if (userType === "Admin") {
      if (
        timeslot.unavailableDates &&
        timeslot.unavailableDates.includes(date.toDateString())
      ) {
        backgroundColor = "#E0EFF1";
      }
    }

    return {
      startTime: String(timeslot.startTime),
      endTime: String(timeslot.endTime),
      backgroundColor,
      textColor: "black",
      checked: false,
      id: timeslot.id,
    };
  }

  function filterTimeSlots(
    isVolunteer: boolean,
    ts: {
      startTime: string;
      endTime: string;
      checked: boolean;
    }
  ) {
    if (isVolunteer) {
      return (
        Number(ts.startTime.substring(0, 2)) >= 9 &&
        Number(ts.startTime.substring(0, 2)) < 17
      );
    }
    return (
      Number(ts.startTime.substring(0, 2)) >= 10 &&
      Number(ts.startTime.substring(0, 2)) < 14
    );
  }

  return (
    <Slots>
      {timeslots
        .map((ts) => mapTimeslotColors(ts))
        .filter((ts) => filterTimeSlots(userType === "Volunteer", ts))
        .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
        .map((timeslot, i) => (
          <MobileTimeslot // eslint-disable-next-line react/no-array-index-key
            key={i}
            startTime={timeslot.startTime}
            endTime={timeslot.endTime}
            backgroundColor={timeslot.backgroundColor}
          />
        ))}
    </Slots>
  );
}
