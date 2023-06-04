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
type PopupProps = {
  timeslot: LazyTimeslot;
  date: Date;
};

export default function AppointmentInfo({ timeslot, date }: PopupProps) {
  const [volunteerBookings, setVolBookings] = useState<LazyUser[]>([]);
  const [riderBookings, setRidBookings] = useState<LazyUser[]>([]);

  useEffect(() => {
    const getUsers = async (bookings: LazyBooking[]) => {
      const users: User[] = []; // eslint-disable-next-line no-restricted-syntax
      for await (const booking of bookings) {
        if (booking.date) {
          const bookingDate = new Date(booking.date);
          if (
            bookingDate.getFullYear() === date.getFullYear() &&
            bookingDate.getMonth() === date.getMonth() &&
            bookingDate.getDay() === date.getDay()
          ) {
            const user = await DataStore.query(User, booking.userID);
            if (user) {
              users.push(user);
            }
          }
        }
      }
      return users;
    };
    const pullData = async () => {
      const volBookings = await timeslot.volunteerBookings
        .toArray()
        .then((bookings) => getUsers(bookings));
      const ridBookings = await timeslot.riderBookings
        .toArray()
        .then((bookings) => getUsers(bookings));
      setVolBookings(volBookings);
      setRidBookings(ridBookings);
    };
    pullData();
  }, []);

  useEffect(() => {
    console.log("selected timeslot", timeslot);
    console.log("volunteer bookings", volunteerBookings);
    console.log("rider bookings", riderBookings);
  }, [volunteerBookings, riderBookings]);

  return (
    <Wrapper>
      {riderBookings.length > 0 && (
        <RiderInfo>
          <Logo src={Horse} />
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
        </RiderInfo>
      )}
      {volunteerBookings.length > 0 && (
        <RiderInfo>
          <Logo src={Dude} />
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
        </RiderInfo>
      )}
    </Wrapper>
  );
}
