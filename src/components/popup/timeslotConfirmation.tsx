import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DataStore } from "aws-amplify";
import UserContext from "../../userContext";
import { checkedLst, uncheckedLst } from "./timeslot";
import { Timeslot, User, Booking } from "../../models";
import warning from "../../images/warning.svg";

import {
  Wrapper,
  Box,
  Description,
  Header,
  Button,
  Row,
} from "../styledComponents";

export type TimeSlotProps = {
  status: String;
  date: Date;
};

const Warning = styled.img`
  position: relative;
  width: 80px;
`;

const SurroundingBoxPopup = styled(Box)`
  display: flex;
  align-items: center;
`;

const ConfirmButton = styled(Button)`
  width: 11rem;
  height: 3rem;
  margin-left: 1rem;
`;

const CancelButton = styled(Button)`
  width: 11rem;
  height: 3rem;
  background: white;
  color: #1b4c5a;
  margin-right: 1rem;
`;

// export default function TimeSlotConfirmation({ status = "" }: TimeSlotProps) {
//   const currentUserFR = useContext(UserContext);
//   const { currentUser } = currentUserFR;
//   const [realUser] = currentUser;
//   const { userType } = realUser;
//   return (
//     <Wrapper>
//       {userType === "Admin" && (
//         <SurroundingBox>
async function addUnavailability(ids: string[], unavailableDate: Date) {
  try {
    ids.forEach(async (id) => {
      const original = await DataStore.query(Timeslot, id);
      if (
        original !== null &&
        original !== undefined &&
        Array.isArray(original.unavailableDates)
      ) {
        const isoDate = new Date(unavailableDate).toISOString().split("T")[0];
        const updatedList = new Set(original.unavailableDates);
        if (!updatedList.has(isoDate)) {
          updatedList.add(isoDate);
          await DataStore.save(
            Timeslot.copyOf(original, (updated) => {
              // eslint-disable-next-line no-param-reassign
              updated.unavailableDates = Array.from(updatedList);
            })
          );
        }
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("An error occurred: ", error.message); // eslint-disable-line no-console
    }
  }
}

async function deleteUnavailability(ids: string[], availableDate: Date) {
  try {
    ids.forEach(async (id) => {
      const original = await DataStore.query(Timeslot, id);
      if (original && Array.isArray(original.unavailableDates)) {
        const date = new Date(availableDate).toISOString().split("T")[0];

        const updatedList = original.unavailableDates.filter((dateString) => {
          if (dateString !== null) {
            const isoDate = new Date(dateString).toISOString().split("T")[0];
            return date !== isoDate;
          }
          return false;
        });

        await DataStore.save(
          Timeslot.copyOf(original, (updated) => {
            updated.unavailableDates = updatedList; // eslint-disable-line no-param-reassign
          })
        );
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("An error occurred: ", error.message); // eslint-disable-line no-console
    }
  }
}

async function addRVBooking(
  TimeslotIDs: string[],
  userID: string,
  bookedDate: Date
) {
  try {
    const original = await DataStore.query(User, userID);
    if (
      original !== null &&
      original !== undefined &&
      original.userType === "Volunteer"
    ) {
      const isoDate = new Date(bookedDate).toISOString().split("T")[0];
      const descriptionStr: string = `User: ${userID} Booked Time: ${isoDate}`;
      TimeslotIDs.forEach(async (TimeslotID) => {
        const booking = new Booking({
          title: "New Booking -- Volunteer",
          date: isoDate,
          description: descriptionStr,
          timeslotID: TimeslotID,
          userID,
        });
        await DataStore.save(booking);
      });
    } else if (
      original !== null &&
      original !== undefined &&
      original.userType === "Rider"
    ) {
      if (TimeslotIDs.length === 1) {
        const isoDate = new Date(bookedDate).toISOString().split("T")[0];
        const descriptionStr: string = `User: ${userID} Booked Time: ${isoDate}`;
        const booking = new Booking({
          title: "New Booking -- Rider",
          date: isoDate,
          description: descriptionStr,
          timeslotID: TimeslotIDs[0],
          userID,
        });
        await DataStore.save(booking);
      }
    }
    console.log(await DataStore.query(Booking));
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.log("An error occurred: ", error.message); // eslint-disable-line no-console
    }
  }
}

async function deleteRVBooking(
  TimeslotIDs: string[], // which time they want to cancel
  userID: string
) {
  console.log(TimeslotIDs);
  console.log(userID);
}
//   /*
//   go through entire booking table, find the booking id that matches
//   the timeslotid, and the date
//    */
//   try {
//     const BookingTable = await DataStore.query(Booking);
//     TimeslotIDs.forEach((TimeslotID) => {
//       BookingTable.forEach((booking) => {
//         if (booking.userID === userID && booking.timeslotID === TimeslotID) {
//           DataStore.delete(booking);
//         }
//       });
//     });
//   } catch (error: unknown) {
//     if (error instanceof Error) {
//       console.log("An error occurred: ", error.message); // eslint-disable-line no-console
//     }
//   }
// }

export default function TimeSlotConfirmation({
  status = "",
  date,
}: TimeSlotProps) {
  const currentUserFR = useContext(UserContext);
  const { currentUser } = currentUserFR;
  const [realUser] = currentUser;
  const { userType, id } = realUser;
  const navigate = useNavigate();

  const handleConfirmationAdmin = () => {
    addUnavailability(uncheckedLst, date); // YYYY-MM-DD
    deleteUnavailability(checkedLst, date); // YYYY-MM-DD
    navigate("/timeslot-success");
  };

  const handleConfirmationRV = () => {
    addRVBooking(checkedLst, id, date);
    navigate("/timeslot-success");
  };

  const handleCancel = () => {
    navigate("/");
  };

  const handleBookingCancel = () => {
    deleteRVBooking(uncheckedLst, id);
    navigate("/timeslot-success");
  };

  return (
    <Wrapper>
      {userType === "admin" && (
        <SurroundingBoxPopup>
          <Warning src={warning} />
          <Header>Save changes?</Header>
          <Description>
            You are choosing to edit the availability of one or more time slots.
            Are you sure you want to do this?
          </Description>
          <Row>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            <ConfirmButton onClick={handleConfirmationAdmin}>
              Confirm
            </ConfirmButton>
          </Row>
        </SurroundingBoxPopup>
      )}
      {userType !== "Admin" && status === "cancel" && (
        <SurroundingBoxPopup>
          <Warning src={warning} />
          <Header>Confirm cancellation?</Header>
          <Description>
            You are choosing to cancel one or more time slots. Are you sure you
            want to do this?
          </Description>
          <Row>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            <ConfirmButton onClick={handleBookingCancel}>Confirm</ConfirmButton>
          </Row>
        </SurroundingBoxPopup>
      )}
      {userType !== "admin" && checkedLst.length !== 0 && (
        <SurroundingBoxPopup>
          <Warning src={warning} />
          <Header>Confirm booking?</Header>
          <Description>
            You are choosing to book one or more time slots. Are you sure you
            want to do this?
          </Description>
          <Row>
            <CancelButton onClick={handleCancel}>Cancel</CancelButton>
            <ConfirmButton onClick={handleConfirmationRV}>Book</ConfirmButton>
          </Row>
        </SurroundingBoxPopup>
      )}
    </Wrapper>
  );
}
