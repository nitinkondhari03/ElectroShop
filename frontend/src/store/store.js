import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../store/userSlice/userSlice";
import cartSlice from "./cartSlice/cartSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartSlice,
  },
});
