import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/Home";
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
import Protected from "./Protectedroutes";
import PageNotFound from "../Pages/PageNotFound";
import TrackOrder from "../Pages/TrackOrder";
import AllCategories from "../Pages/AllCategories";
const AllRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/register" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassowrd/>} />
        <Route path="/resetPassword/:id" element={<ResetPassword />} />
        <Route path="/product-category" element={<CategoryProduct />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/changePassword" element={<Protected><ChangePassword /></Protected>}/>
        <Route path="/cart" element={<Protected><Cart/></Protected>}/>
        <Route path="/search" element={<SearchProduct />} />
        <Route path="/cancel" element={<Protected><Cancel /></Protected>}/>
        <Route path="/success" element={<Protected><Success /></Protected>}/>
        <Route path="/allcategories" element={<AllCategories/>}/>
        <Route path="/order" element={ <Protected> <OrderPage /></Protected>}/>
        <Route path="/trackOrder/:id" element={<Protected><TrackOrder/></Protected>}/>
        <Route path="/profile" element={<Protected><Profile /></Protected>}/>
        <Route path="/updateProfile" element={<Protected><UpdateProfile /></Protected>}/>
        <Route path="/admin-panel" element={<AdminPanel />}>
          <Route path="all-users" element={<AllUsers />} />
          <Route path="all-products" element={<AllProducts />} />
          <Route path="all-orders" element={<AllOrder />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
};

export default AllRoutes;
