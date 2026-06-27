import { useContext } from "react";
import { AuthContext } from "../api/AuthProvider";

export const useAuth = () => {
  return useContext(AuthContext);
};
