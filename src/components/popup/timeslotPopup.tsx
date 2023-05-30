import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { DataStore } from "aws-amplify";
import x from "../../images/X.svg";
import { PopupDiv, PopupBox, X, CancelBtn, SaveBtn } from "../styledComponents";
import Monthly from "../monthlyView";
import AptInfo from "../appointmentInfo";
import Timeslots from "./timeslots";
import { LazyTimeslot, Timeslot } from "../../models";
import TimeslotConfirmation from "./timeslotConfirmation";
import TimeslotSuccess from "./timeslotSuccess";
import UserContext from "../../userContext";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding-bottom: 90px;
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 0 50px 0 50px;
  // gap: 20px;
  width: 400px;
`;

const RightColumn = styled.div`
  padding-right: 10px;
  width: 500px;
  // flex: 1;
`;

const BtnContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  // justify-content: space-between;
  // width: 80%;
  padding-top: 40px;
  gap: 20px;
`;

const DateHeader = styled.p`
  color: #1b4c5a;
  font-size: 30px;
  font-family: "Roboto";
  font-weight: 700;
  padding-bottom: 10px;
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

interface PopupProps {
  popup: boolean;
  confirmPopup: boolean;
  handleConfirmOpen: () => void;
  successPopup: boolean;
  handleSuccessOpen: () => void;
  onClose: () => void;
  date: Date;
  toggleProp: string;
}

interface TsData {
  startTime: Date;
  endTime: Date;
  checked: boolean;
  id: string;
}

export default function Popup({
  popup,
  confirmPopup,
  handleConfirmOpen,
  successPopup,
  handleSuccessOpen,
  onClose,
  date,
  toggleProp,
}: PopupProps) {
  const [timeslots, setTs] = useState<LazyTimeslot[]>([]);
  const currentUserFR = useContext(UserContext);
  const { currentUser } = currentUserFR;
  const [realUser] = currentUser;
  const { userType, id } = realUser;
  const [bookable, setBookable] = useState<TsData[]>([]);

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    const pullData = async () => {
      const ts = await DataStore.query(Timeslot);
      setTs(ts);
    };
    const ts: TsData[] = [];
    const fetchBookable = async () => {
      // jk logic is flawed look in bookings instead you foole
      if (timeslots.length > 0) {
        timeslots.forEach(async (timeslot) => {
          if (
            typeof timeslot.startTime === "string" &&
            typeof timeslot.endTime === "string"
          ) {
            let bookings;
            if (userType === "Volunteer") {
              bookings = await timeslot.volunteerBookings.toArray();
            } else if (userType === "Rider") {
              bookings = await timeslot.riderBookings.toArray();
            } else {
              bookings = await timeslot.volunteerBookings
                .toArray()
                .then(async (volunteerBookings) => {
                  const riderBookings = await timeslot.riderBookings.toArray();
                  volunteerBookings.concat(riderBookings);
                });
            }
            let checked = false;
            if (bookings) {
              checked = bookings.some((booking) => {
                if (booking.date) {
                  const dateCopy = new Date(booking.date);
                  const bookingDate = new Date(
                    dateCopy.setDate(dateCopy.getDate() + 1)
                  );
                  if (
                    bookingDate.getMonth() === date.getMonth() &&
                    bookingDate.getDate() === date.getDate() &&
                    bookingDate.getFullYear() === date.getFullYear()
                  ) {
                    return booking.userID === id;
                  }
                  return false;
                }
                return false;
              });
            }
            ts.push({
              startTime: new Date(`July 4 1776 ${timeslot.startTime}`),
              endTime: new Date(`July 4 1776 ${timeslot.endTime}`),
              checked,
              id: timeslot.id,
            });
          }
        });
      }
      setBookable(ts);
    };
    pullData();
    fetchBookable();
  }, [popup]);

  return (
    <div>
      <PopupDiv
        open={popup}
        onClose={onClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <PopupBox>
          <X src={x} onClick={onClose} />
          {!confirmPopup && (
            <Wrapper>
              <LeftColumn>
                <Monthly />
                <AptHeader>Appointment Info</AptHeader>
                <AptInfo toggleProp={toggleProp} />
              </LeftColumn>
              <RightColumn>
                <DateHeader>{formattedDate}</DateHeader>
                <Timeslots bookable={bookable} />
                <BtnContainer>
                  <CancelBtn onClick={onClose}>Cancel</CancelBtn>
                  <SaveBtn onClick={handleConfirmOpen}>Save</SaveBtn>
                </BtnContainer>
              </RightColumn>
            </Wrapper>
          )}
          {confirmPopup && !successPopup && (
            <TimeslotConfirmation
              handleClicked={handleSuccessOpen}
              handleCancelled={onClose}
              status="book"
              date={date}
            />
          )}
          {confirmPopup && successPopup && (
            <TimeslotSuccess handleCancelled={onClose} />
          )}
        </PopupBox>
      </PopupDiv>
    </div>
  );
}
