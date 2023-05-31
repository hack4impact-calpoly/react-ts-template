/* eslint-disable no-console */
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { DataStore } from "@aws-amplify/datastore";
import UserContext from "../../userContext";
import MobileTimeslot from "./mobileTimeslot";
import { Booking, LazyTimeslot } from "../../models";

const Slots = styled.section`
  overflow-y: auto;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 7%;
  width: 100%;
  height: 400px;
`;

interface TimeslotsProps {
  models: LazyTimeslot[];
  date: Date;
}

export default function MobileTimeslots({ models, date }: TimeslotsProps) {
  const currentUserFR = useContext(UserContext);
  const { currentUser } = currentUserFR;
  const [realUser] = currentUser;
  const { userType } = realUser;
  // const [timeslots, setTimeslots] = useState(models);
  const [bookings, setBookings] = useState<Booking[]>([]);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingModels = await DataStore.query(Booking);
        setBookings(bookingModels);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    fetchBookings();
  }, []);

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
      {models
        .map((ts) => mapTimeslotColors(ts))
        .filter((ts) => filterTimeSlots(userType === "Volunteer", ts))
        .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
        .map((timeslot, i) => (
          <MobileTimeslot // eslint-disable-next-line react/no-array-index-key
            key={i}
            startTime={timeslot.startTime}
            endTime={timeslot.endTime}
            date={date}
            backgroundColor={timeslot.backgroundColor}
            tId={timeslot.id}
          />
        ))}
    </Slots>
  );
}
