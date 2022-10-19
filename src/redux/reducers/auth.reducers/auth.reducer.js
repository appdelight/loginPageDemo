import { createSlice } from "@reduxjs/toolkit";

let user = JSON.parse(localStorage.getItem("user"));
const initialState = user ? { loggedIn: true, user } : {};

export const authentication = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    loging_Requested: (state) => {
      state.logging = true;
      state.loggedIn = false;
      state.msg = "logging";
      state.user = user
      return state;
    },
    login_Success: (state) => {
      state.logging = false;
      state.loggedIn = true;
      state.msg = "logged in successfully";
      state.user = user;
      return state;
    },
    login_Failed: (state) => {
      state.logging = false;
      state.loggedIn = false;
      state.msg = "logging fail check password or email";
      return state;

    },
    logedout: (state) => {
      state.msg = "logged out";
       state.loggedIn = false;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const { loging_Requested, login_Success, login_Failed, logedout } =  authentication.actions;

let loginReducer;
export default loginReducer = authentication.reducer;
