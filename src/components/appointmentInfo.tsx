import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataStore } from "@aws-amplify/datastore";
import Horse from "../images/horseRider.svg";
import Dude from "../images/person.svg";
import { User, LazyUser, LazyBooking, LazyTimeslot } from "../models";
import "@fontsource/roboto";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Logo = styled.img`
  width: 2.5em;
  padding-right: 10px;
`;

const RiderInfo = styled.div`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 90%;
  line-height: 19px;
  color: black;
  background: white;

  margin-bottom: 25px;
  margin-left: 2%;
  width: 100%;
`;
const RiderContent = styled.text`
  flex-direction: row;
  width: 100%;
  margin-left: 10px;
  font-size: 16px;
  font-weight: 700;
`;

const AptHeader = styled.h1`
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 125%;
  line-height: 200%;
  background: white;
  color: #1b4c5a;
`;

type PopupProps = {
  timeslot: LazyTimeslot;
  date: Date;
};

export default function AppointmentInfo({ timeslot, date }: PopupProps) {
  const [volunteerBookings, setVolBookings] = useState<LazyUser[]>([]);
  const [riderBookings, setRidBookings] = useState<LazyUser[]>([]);

  // const getUsers = async (bookings: LazyBooking[]) => {
  //   // console.log("IN GET USERS TIMESLOT =", timeslot);
  //   const volUsers: User[] = [];
  //   const ridUsers: User[] = []; // eslint-disable-next-line no-restricted-syntax
  //   for await (const booking of bookings) {
  //     if (booking.date) {
  //       if (
  //         Number(booking.date.substring(0, 4)) === date.getFullYear() &&
  //         Number(booking.date.substring(5, 7)) === date.getMonth() + 1 &&
  //         Number(booking.date.substring(8, 10)) === date.getDate() &&
  //         booking.timeslotID === timeslot.id
  //       ) {
  //         // console.log(booking);
  //         // console.log(timeslot);
  //         // console.log(booking.date);
  //         // console.log(date.getFullYear());
  //         // console.log(date.getMonth() + 1);
  //         // console.log(date.getDate());
  //         // console.log("bookings");
  //         // console.log(Number(booking.date.substring(5, 7)));
  //         // console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
  //         const user = await DataStore.query(User, booking.userID);
  //         // console.log("USER HAS BEEN FETCHED", timeslot);
  //         if (user) {
  //           if (user.userType === "Volunteer") {
  //             // console.log("VOLLLLLLLLLLLLLLLLLL", timeslot);
  //             volUsers.push(user);
  //           } else if (user.userType === "Rider") {
  //             // console.log("RIDDDDDDDDDDDDDDDDDD");
  //             ridUsers.push(user);
  //           }
  //         }
  //       }
  //     }
  //   }
  //   // console.log("VOLUSERS", volUsers);
  //   // console.log("RIDUSERS", ridUsers);
  //   return { volUsers, ridUsers };
  // };
  // const pullData = async () => {
  //   const volBookingsArray = await timeslot.volunteerBookings.toArray(); // turns out the volunteer and rider booking arrays
  //   // in our objects just return the same thing so there's not really a point to them
  //   // console.log("IN PULL DATA", volBookingsArray);
  //   // console.log("IN PULL DATA TIMESLOT =", timeslot);
  //   // console.log("HOW MANY TIMES ARE YOU CALLED DAMNIT");
  //   // console.log();
  //   // console.log();
  //   // console.log();
  //   // console.log();
  //   const bookings = await getUsers(volBookingsArray);
  //   // console.log(":::::: Bookings ::::::", bookings);
  //   setVolBookings(bookings.volUsers);
  //   setRidBookings(bookings.ridUsers);
  // };
  // console.log(initialTimeslot);
  // console.log(timeslot);
  // if (initialTimeslot !== timeslot) {
  //   console.log("WE IN HERE");
  //   pullData();
  //   initialTimeslot = timeslot;
  // }
  // pullData();

  // useEffect(() => {
  //   pullData();
  // }, [timeslot]);

  useEffect(() => {
    console.log("TRIGGERED USEEFFECT TIMESLOT = ", timeslot);
    const getUsers = async (bookings: LazyBooking[]) => {
      // console.log("IN GET USERS TIMESLOT =", timeslot);
      const volUsers: User[] = [];
      const ridUsers: User[] = [];
      let thereWasOne = false; // eslint-disable-next-line no-restricted-syntax
      for await (const booking of bookings) {
        if (booking.date) {
          if (
            Number(booking.date.substring(0, 4)) === date.getFullYear() &&
            Number(booking.date.substring(5, 7)) === date.getMonth() + 1 &&
            Number(booking.date.substring(8, 10)) === date.getDate() &&
            booking.timeslotID === timeslot.id
          ) {
            // console.log(booking);
            // console.log(timeslot);
            // console.log(booking.date);
            // console.log(date.getFullYear());
            // console.log(date.getMonth() + 1);
            // console.log(date.getDate());
            // console.log("bookings");
            // console.log(Number(booking.date.substring(5, 7)));
            // console.log("[[[[[[[[[[[[[[[[[[[[[[[[[[[[[");
            thereWasOne = true;
            const user = await DataStore.query(User, booking.userID);
            // console.log("USER HAS BEEN FETCHED", timeslot);
            if (user) {
              if (user.userType === "Volunteer") {
                // console.log("VOLLLLLLLLLLLLLLLLLL", timeslot);
                volUsers.push(user);
              } else if (user.userType === "Rider") {
                // console.log("RIDDDDDDDDDDDDDDDDDD");
                ridUsers.push(user);
              }
            }
          }
        }
      }
      if (thereWasOne === false) {
        // eslint-disable-next-line no-promise-executor-return
        await new Promise((r) => setTimeout(r, 500));
      }
      // console.log("VOLUSERS", volUsers);
      // console.log("RIDUSERS", ridUsers);
      return { volUsers, ridUsers };
    };
    const pullData = async () => {
      const volBookingsArray = await timeslot.volunteerBookings.toArray(); // turns out the volunteer and rider booking arrays
      // in our objects just return the same thing so there's not really a point to them
      // console.log("IN PULL DATA", volBookingsArray);
      // console.log("IN PULL DATA TIMESLOT =", timeslot);
      const bookings = await getUsers(volBookingsArray);
      // console.log(":::::: Bookings ::::::", bookings);
      setVolBookings(bookings.volUsers);
      setRidBookings(bookings.ridUsers);
    };
    pullData();
  }, [timeslot]);

  return (
    <Wrapper>
      <AptHeader>Appointment Info</AptHeader>
      <RiderInfo>
        <Logo src={Horse} />
        {riderBookings.length > 0 && (
          <RiderContent>
            Riders:
            {riderBookings
              .map((booking) => {
                if (booking.firstName && booking.lastName) {
                  return " ".concat(booking.firstName, " ", booking.lastName);
                }
                return "";
              })
              .join()}
          </RiderContent>
        )}
      </RiderInfo>

      {/* {volunteerBookings.length > 0 && ( */}
      <RiderInfo>
        <Logo src={Dude} />
        {volunteerBookings.length > 0 && (
          <RiderContent>
            Volunteers:
            {volunteerBookings
              .map((booking) => {
                if (booking.firstName && booking.lastName) {
                  return " ".concat(booking.firstName, " ", booking.lastName);
                }
                return "";
              })
              .join()}
          </RiderContent>
        )}
      </RiderInfo>
      {/* )} */}
    </Wrapper>
  );
}
