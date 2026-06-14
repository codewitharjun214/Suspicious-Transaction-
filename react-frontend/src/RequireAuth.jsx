import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { UserContext } from "./UserContext";

const RequireAuth = ({ children }) => {
  const { userData } = useContext(UserContext);
  const location = useLocation();

  if (!userData) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return children;
};

export default RequireAuth;
