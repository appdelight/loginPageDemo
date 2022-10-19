import { createSlice } from "@reduxjs/toolkit";
export const registration = createSlice({
  name: "registration",
  initialState: {},
  reducers: {
    signup_Requested: (state) => {
      state.signingUp = true;
      state.msg = "signingUp";
      return state;
    },
    signup_Success: (state) => {
      state.signup = true;
      state.msg = "signup is successfully";
      return state;
    },
    signup_Failed: (state,data) => {
      // console.log(payload,'adsfasd');
      state.msg = data.payload.msg;
      return state;
    },
  },
});

export const { signup_Requested, signup_Success, signup_Failed } =registration.actions;
let signupReducer;
export default signupReducer = registration.reducer;
