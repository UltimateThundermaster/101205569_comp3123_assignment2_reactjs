import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localStorage";

export const PublicRoute = ({ children }) => {
    const token = getToken()
    if (token !== null) {
      return <Navigate to="/" />;
    }
    return children;
  };