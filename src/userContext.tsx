import { createContext } from "react";
import { User } from "./types";

const defaultFields = {
  currentUser: {} as User,
  setUser: (() => {}) as (user: User) => void,
};

const UserContext = createContext(defaultFields);
export default UserContext;
