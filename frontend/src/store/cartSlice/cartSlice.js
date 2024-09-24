import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SummaryApi from "../../common/index.js";
//read action
export const showCart = createAsyncThunk(
  "showCart",
  async (args, { rejectWithValue }) => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
    });
    try {
      const result = await response.json();
      return result.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const initialState = {
  cart: null,
  loading: false,
  error: null,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartProductCount: (state, action) => {
      state.cart = action.payload;
    },
  },
  extraReducers: (builder) => {
    //showCart
    builder.addCase(showCart.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(showCart.fulfilled, (state, action) => {
      state.loading = false;
      state.cart = action.payload;
    });
    builder.addCase(showCart.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setCartProductCount } = cartSlice.actions;

export default cartSlice.reducer;
