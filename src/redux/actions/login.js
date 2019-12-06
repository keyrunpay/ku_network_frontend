import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ISLOADING,
  LOGIN_USER_FAILURE,
  USER_LOGOUT
} from "./types";

export const loginUserSuccess = data => {
  return {
    type: LOGIN_USER_SUCCESS,
    payload: data
  };
};

export const toggleLoginUserIsLoading = status => {
  return {
    type: LOGIN_USER_ISLOADING,
    payload: status
  };
};

export const loginUserFailure = msg => {
  return {
    type: LOGIN_USER_FAILURE,
    payload: msg
  };
};

export const logoutUser = () => {
  return {
    type: USER_LOGOUT
  };
};
