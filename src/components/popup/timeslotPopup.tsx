import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import x from "../../images/X.svg";
import { PopupDiv, PopupBox, X, CancelBtn, SaveBtn } from "../styledComponents";
import Monthly from "../monthlyView";
import AptInfo from "../appointmentInfo";
import Timeslots from "./timeslots";
import { LazyTimeslot } from "../../models";
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

interface PopupProps {
  popup: boolean;
  confirmPopup: boolean;
  handleConfirmOpen: () => void;
  successPopup: boolean;
  handleSuccessOpen: () => void;
  onClose: () => void;
  date: Date;
  timeslots: LazyTimeslot[];
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
  timeslots,
}: PopupProps) {
  const currentUserFR = useContext(UserContext);
  const { currentUser } = currentUserFR;
  const [realUser] = currentUser;
  const { userType, id } = realUser;
  const [bookable, setBookable] = useState<TsData[]>([]);
  const [selected, setSelected] = useState<LazyTimeslot>();

  const options: Intl.DateTimeFormatOptions = {
    weekday: "long",
    month: "long",
    day: "numeric",
  };
  const formattedDate = date.toLocaleDateString("en-US", options);

  useEffect(() => {
    const ts: TsData[] = [];
    const getSelected = () => {
      const sel = timeslots.find((timeslot) => {
        if (timeslot.startTime) {
          const time = timeslot.startTime.split(":");
          return (
            Number(time[0]) === date.getHours() &&
            Number(time[1]) === date.getMinutes()
          );
        }
        return false;
      });
      setSelected(sel);
    };
    const fetchBookable = async () => {
      if (timeslots.length > 0) {
        timeslots.forEach(async (timeslot) => {
          if (timeslot.startTime && timeslot.endTime) {
            if (userType === "Volunteer" || userType === "Rider") {
              let bookings;
              if (userType === "Volunteer") {
                bookings = await timeslot.volunteerBookings.toArray();
              } else {
                bookings = await timeslot.riderBookings.toArray();
              }
              let checked = false;
              let available = true;
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
                      if (booking.userID === id) {
                        return true;
                      }
                      available = false;
                    }
                    return false;
                  }
                  return false;
                });
              }
              if (available) {
                ts.push({
                  startTime: new Date(`July 4 1776 ${timeslot.startTime}`),
                  endTime: new Date(`July 4 1776 ${timeslot.endTime}`),
                  checked,
                  id: timeslot.id,
                });
              }
            } else {
              // todo: uncheck for unavailable
              ts.push({
                startTime: new Date(`July 4 1776 ${timeslot.startTime}`),
                endTime: new Date(`July 4 1776 ${timeslot.endTime}`),
                checked: true,
                id: timeslot.id,
              });
            }
          }
        });
      }
      setBookable(ts);
    };
    getSelected();
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
                {selected && <AptInfo timeslot={selected} date={date} />}
              </LeftColumn>
              <RightColumn>
                <DateHeader>{formattedDate}</DateHeader>
                <Timeslots bookable={bookable} selectedDate={date} />
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
