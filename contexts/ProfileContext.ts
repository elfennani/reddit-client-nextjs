import { createContext } from "react";
import { UserData } from "../types/types";

export default createContext<UserData | null | undefined>(null);
