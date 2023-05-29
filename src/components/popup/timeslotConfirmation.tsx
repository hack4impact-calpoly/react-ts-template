import { useContext } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { DataStore } from "aws-amplify";
import UserContext from "../../userContext";
import { checkedLst, uncheckedLst } from "./timeslot";
import { Timeslot, User, Booking } from "../../models";
import warning from "../../images/warning.svg";
import x from "../../images/X.svg";
import {
  PopupBox,
  X,
  CancelBtn,
  SaveBtn,
  Description,
  Header,
  Row,
} from "../styledComponents";

export type TimeSlotProps = {
  onClose: () => void;
  status: String;
  date: Date;
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 90px;
`;

const Warning = styled.img`
  position: relative;
  width: 80px;
`;

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
  onClose,
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
    <div>
      {userType === "admin" && (
        <PopupBox>
          <X src={x} onClick={onClose} />
          <Wrapper>
            <Warning src={warning} />
            <Header>Save changes?</Header>
            <Description>
              You are choosing to edit the availability of one or more time
              slots. Are you sure you want to do this?
            </Description>
            <Row>
              <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
              <SaveBtn onClick={handleConfirmationAdmin}>Confirm</SaveBtn>
            </Row>
          </Wrapper>
        </PopupBox>
      )}
      {userType !== "Admin" && status === "cancel" && (
        <PopupBox>
          <X src={x} onClick={onClose} />
          <Wrapper>
            <Warning src={warning} />
            <Header>Confirm cancellation?</Header>
            <Description>
              You are choosing to cancel one or more time slots. Are you sure
              you want to do this?
            </Description>
            <Row>
              <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
              <SaveBtn onClick={handleBookingCancel}>Confirm</SaveBtn>
            </Row>
          </Wrapper>
        </PopupBox>
      )}
      {userType !== "admin" && checkedLst.length !== 0 && (
        <PopupBox>
          <X src={x} onClick={onClose} />
          <Wrapper>
            <Warning src={warning} />
            <Header>Confirm booking?</Header>
            <Description>
              You are choosing to book one or more time slots. Are you sure you
              want to do this?
            </Description>
            <Row>
              <CancelBtn onClick={handleCancel}>Cancel</CancelBtn>
              <SaveBtn onClick={handleConfirmationRV}>Book</SaveBtn>
            </Row>
          </Wrapper>
        </PopupBox>
      )}
    </div>
  );
}
