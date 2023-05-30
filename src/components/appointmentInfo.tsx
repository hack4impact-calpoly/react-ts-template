import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { DataStore } from "@aws-amplify/datastore";
import Horse from "../images/horseRider.svg";
import Dude from "../images/person.svg";
import { Booking, User, LazyTimeslot } from "../models";
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
};

export default function AppointmentInfo({ timeslot }: PopupProps) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  useEffect(() => {
    const pullData = async () => {
      const bookingModels = await DataStore.query(Booking);
      setBookings(bookingModels);
    };
    console.log("selected timeslot", timeslot);

    pullData();
  }, []);
  useEffect(() => {
    const pullData = async () => {
      const userModel = await DataStore.query(User);
      setUsers(userModel);
    };

    pullData();
  }, []);
  // this was for experimentation
  bookings.forEach((booking) => {
    for (let i = 0; i < users.length; i++) {
      if (booking.userID === users[i].id) {
        console.log(users[i].firstName);
      }
    }
  });

  return (
    <Wrapper>
      <RiderInfo>
        <Logo src={Horse} />
        <RiderContent>Riders: Jane Doe, John Smith</RiderContent>
      </RiderInfo>
      <RiderInfo>
        <Logo src={Dude} />
        <RiderContent>Volunteers: Jane Doe, John Smith</RiderContent>
      </RiderInfo>
    </Wrapper>
  );
}
