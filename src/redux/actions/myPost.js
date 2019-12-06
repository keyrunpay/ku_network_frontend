import { MY_POST } from "./types";

export const getMyPostSuccess = data => {
  return {
    type: MY_POST.SUCCESS,
    payload: data
  };
};

export const getMyPostFailed = msg => {
  return {
    type: MY_POST.FAILED,
    payload: msg
  };
};

export const setMyPostLoadingState = payload => {
  return {
    type: MY_POST.LOADING,
    payload: payload
  };
};
