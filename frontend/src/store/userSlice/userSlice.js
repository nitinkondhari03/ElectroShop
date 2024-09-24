import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SummaryApi from "../../common/index.js";
//read action
export const showUser = createAsyncThunk(
  "showUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
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

//logout User
export const logoutUser = createAsyncThunk(
  "logoutUser",
  async (args, { rejectWithValue }) => {
    const response = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });
    try {
      const result = await response.json();
      return result;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const initialState = {
  user: null,
  loading: false,
  isAuthenticated: false,
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserDetails: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    //showUser
    builder.addCase(showUser.pending, (state, action) => {
      state.loading = true;
      state.isAuthenticated = false;
    });
    builder.addCase(showUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(showUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.isAuthenticated = false;
    });
    //logoutUser
    builder.addCase(logoutUser.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(logoutUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.isAuthenticated = false;
    });
    builder.addCase(logoutUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
  },
});

// Action creators are generated for each case reducer function
export const { setUserDetails } = userSlice.actions;

export default userSlice.reducer;
