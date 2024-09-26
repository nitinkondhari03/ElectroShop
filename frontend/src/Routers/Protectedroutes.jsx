import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
const Protected = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state?.user);
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }
  return children;
};

export default Protected;
