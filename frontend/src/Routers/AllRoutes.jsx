import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
import Footer from "../Components/Footer";
import Login from "../Pages/Login";
import SignUp from "../Pages/SignUp";
import ForgotPassowrd from "../Pages/ForgotPassowrd";
import AdminPanel from "../Pages/AdminPanel";
import AllUsers from "../Pages/AllUsers";
import AllProducts from "../Pages/AllProducts";
import CategoryProduct from "../Pages/CategoryProduct";
import ProductDetails from "../Pages/ProductDetails";
import Cart from "../Pages/Cart";
import SearchProduct from "../Pages/SearchProduct";
import Cancel from "../Pages/Cancel";
import Success from "../Pages/Success";
import AllOrder from "../Pages/AllOrder";
import OrderPage from "../Pages/OrderPage";
import Profile from "../Pages/Profile";
import ResetPassword from "../Pages/ResetPassword";
import ChangePassword from "../Pages/ChangePassword";
import UpdateProfile from "../Pages/UpdateProfile";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassowrd />} />
        <Route path="/resetPassword/:id" element={<ResetPassword/>}/>
        <Route path="/changePassword" element={<ChangePassword/>}/>
        <Route path="/product-category" element={<CategoryProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/cancel" element={<Cancel />} />
        <Route path="/success" element={<Success />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/profile" element={<Profile/>}/>
        <Route path="/updateProfile" element={<UpdateProfile/>}/>
        
        <Route path="/admin-panel" element={<AdminPanel />}>
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="all-orders" element={<AllOrder />} />
        </Route>
      </Routes>
    </div>
  );
};

export default AllRoutes;
