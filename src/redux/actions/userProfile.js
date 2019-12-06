import { USER_PROFILE_INFO } from "./types";

export const getUserProfileSuccess = payload => {
  return {
    type: USER_PROFILE_INFO.SUCCESS,
    payload
  };
};

export const getUserProfileFailed = payload => {
  return {
    type: USER_PROFILE_INFO.FAILED,
    payload
  };
};

export const setUserProfileLoadingStatus = payload => {
  return {
    type: USER_PROFILE_INFO.LOADING,
    payload
  };
};
