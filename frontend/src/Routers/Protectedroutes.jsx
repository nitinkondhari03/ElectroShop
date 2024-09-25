import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";
const Protected = ({ children }) => {
  const { user, isAuthenticated } = useSelector((state) => state?.user);
  let location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default Protected;
