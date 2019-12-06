import { POST_TYPES } from "./types";

export const getPostSuccess = data => {
  return {
    type: POST_TYPES.GET_POST_SUCCESS,
    payload: data
  };
};

export const getPostFailure = msg => {
  return {
    type: POST_TYPES.GET_POST_FAILED,
    payload: msg
  };
};

export const setPostLoadingState = payload => {
  return {
    type: POST_TYPES.POST_LOADING_STATE,
    payload: payload
  };
};
