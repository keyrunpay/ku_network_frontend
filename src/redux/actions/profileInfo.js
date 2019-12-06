import { PROFILE_INFO_TYPE } from "./types";

export const getProfileInfoSuccess = payload => {
  return {
    type: PROFILE_INFO_TYPE.GET_PROFILE_INFO_SUCCESS,
    payload
  };
};

export const getProfileInfoFailed = payload => {
  return {
    type: PROFILE_INFO_TYPE.GET_PROFILE_INFO_FAILED,
    payload
  };
};

export const setProfileInfoFetchState = payload => {
  return {
    type: PROFILE_INFO_TYPE.GET_PROFILE_INFO_STATE,
    payload
  };
};

export const changeOneProfileValue = payload => {
  return {
    type: PROFILE_INFO_TYPE.CHANGE_ONE_VALUE,
    payload
  };
};
