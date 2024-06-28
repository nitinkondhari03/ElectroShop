import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import ForgotPassowrd from "../Pages/ForgotPassowrd";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
const AllRoutes = () => {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassowrd />} />
        <Route path="/admin-panel" element={<AdminPanel />}>
          <Route path="all-users" element={<AllUsers />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default AllRoutes;
