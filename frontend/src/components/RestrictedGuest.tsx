import React from "react";
import { Navigate } from "react-router-dom";

interface RestrictedGuest {
  children: React.ReactNode;
}

const RestrictedGuest: React.FC<RestrictedGuest> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/email" replace />;
  }

  return <>{children}</>;
};

export default RestrictedGuest;
