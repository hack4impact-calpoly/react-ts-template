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

interface MobileTimeslotsProps {
  models: LazyTimeslot[];
  date: Date;
  toggleValue: string;
}

interface Timeslot {
  startTime: string;
  endTime: string;
  backgroundColor: string;
  textColor: string;
  checked: boolean;
  enabled: boolean;
  timeslotId: string;
}

function convertToYMD(date: Date) {
  const localString = date.toLocaleDateString();
  const splitDate = localString.split("/");
  let retString = `${localString.split("/")[2]}-`;

  if (splitDate[0].length === 1) {
    retString += `0`;
  }
  retString += `${localString.split("/")[0]}-`;
  if (splitDate[1].length === 1) {
    retString += `0`;
  }
  retString += `${localString.split("/")[1]}`;
  return retString;
}

export default function MobileTimeslots({
  models,
  date,
  toggleValue,
}: MobileTimeslotsProps) {
  const currentUserFR = useContext(UserContext);
  const { currentUser } = currentUserFR;
  const [realUser] = currentUser;
  const { userType, id: currentUserId } = realUser;
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
    let enabled = true;

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

    if (
      timeslot.unavailableDates &&
      timeslot.unavailableDates.includes(convertToYMD(date))
    ) {
      if (userType === "Admin") {
        backgroundColor = "#C1C1C1";
      } else {
        enabled = false;
      }
    }

    return {
      startTime: String(timeslot.startTime),
      endTime: String(timeslot.endTime),
      backgroundColor,
      textColor: "black",
      checked: false,
      enabled,
      timeslotId: timeslot.id,
    };
  }

  function filterTimeSlots(timeslot: Timeslot) {
    if (toggleValue === "Riders" || userType === "Rider") {
      return (
        Number(timeslot.startTime.substring(0, 2)) >= 10 &&
        Number(timeslot.startTime.substring(0, 2)) < 14 &&
        timeslot.enabled
      );
    }
    if (toggleValue === "My Slots") {
      return (
        bookings.some(
          (booking) =>
            booking.userID === currentUserId &&
            booking.timeslotID === timeslot.timeslotId &&
            booking.date === convertToYMD(date)
        ) && timeslot.enabled
      );
    }
    return timeslot.enabled;
  }

  return (
    <Slots>
      {models
        .map((timeslot) => mapTimeslotColors(timeslot))
        .filter((timeslot) => filterTimeSlots(timeslot))
        .sort((a, b) => (a.startTime < b.startTime ? -1 : 1))
        .map((timeslot, i) => (
          <MobileTimeslot // eslint-disable-next-line react/no-array-index-key
            key={i}
            startTime={timeslot.startTime}
            endTime={timeslot.endTime}
            date={date}
            backgroundColor={timeslot.backgroundColor}
            tId={timeslot.timeslotId}
          />
        ))}
    </Slots>
  );
}
