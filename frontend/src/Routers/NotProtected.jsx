import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const NotProtected = ({ children }) => {
  const { user } = useSelector((state) => state?.user);
  let location = useLocation();
  if (user !== undefined) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }
  return children;
};

export default NotProtected;
