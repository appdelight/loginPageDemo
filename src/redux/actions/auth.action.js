import { Post } from "../../config/requests";
import Axios from "axios";
import {
  loging_Requested,
  login_Success,
  login_Failed,
  logout,
  logedout,
} from "../reducers/auth.reducers/auth.reducer";
import {
  signup_Requested,
  signup_Success,
  signup_Failed,
} from "../reducers/auth.reducers/signup.reducer";

export const login = (loginData) => {
  return async function (dispatch) {
    dispatch(loging_Requested());
    // console.log("vvvvvvvvvvvvvvvvvv");
    let result = await Post("/login", loginData);
    console.log(result, "poooooooooooo");
    dispatch(login_Success())
    return result;
    // let result;
    // Post("/login", loginData)
    //   .then((response) => {
    //     console.log(response, "mmmccccc");
    //     dispatch(login_Success());
    //     return response;
    //     result = response;
    //   })
    //   .catch((error) => {
    //     console.log(error.message, "error");
    //     dispatch(login_Failed());
    //     return error;
    //     result = error;
    //   });
    // return result;
  };
};

export const userSignup = (signupData) => {
  return async function (dispatch) {
    dispatch(signup_Requested());
    let result = await Post("/signup", signupData);
    console.log(result, "poooooooooooo");
    dispatch(signup_Success())
    return result;
    // let result;
    // console.log(signupData,'kkkllllll');
    // Post("/signup", signupData)
    //   .then((response) => {
    //     dispatch(signup_Success());
    //     result = response;
    //   })
    //   .catch((err) => {
    //     dispatch(signup_Failed({ msg: err.massage }));
    //     result = err;
    //   });

    // return result;
  };
};

export const logoutUser = () => {
  return async function (dispatch) {
    dispatch(logedout());
    return;
  };
};
