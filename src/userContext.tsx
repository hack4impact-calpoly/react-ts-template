import { createContext } from "react";
import { User } from "./types";

// create a context with the properties of our user data
// interface UserData {
//   id: number;
//   userName: string;
//   firstName: string;
//   lastName: string;
//   userType: string;
//   bookings: [number];
// }
// const exuser: UserData = {
//   id: 1,
//   userName: "",
//   firstName: "",
//   lastName: "",
//   userType: "",
//   bookings: [1],
// };
const defaultFields = {
  //   currentUser: {
  //     id: String,
  //     userName: String,
  //     firstName: String,
  //     lastName: String,
  //     userType: String,
  //     bookings: [Number],
  //   },
  currentUser: {} as User,
  setUser: (() => {}) as (user: User) => void,
};

const UserContext = createContext(defaultFields);
export default UserContext;
