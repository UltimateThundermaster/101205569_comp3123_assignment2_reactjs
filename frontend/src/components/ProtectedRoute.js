import { Navigate } from "react-router-dom";
import { getToken } from "../utils/localStorage";

export const ProtectedRoute = ({ children }) => {
    const token = getToken()
    if (token === null) {
      return <Navigate to="/login" />;
    }
    return children;
  };