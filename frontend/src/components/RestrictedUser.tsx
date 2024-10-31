import React from "react";
import { Navigate } from "react-router-dom";

interface RestrictedUserProps {
  children: React.ReactNode;
}

const RestrictedUser: React.FC<RestrictedUserProps> = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

export default RestrictedUser;
