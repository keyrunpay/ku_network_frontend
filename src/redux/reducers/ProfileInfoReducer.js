import { PROFILE_INFO_TYPE } from "../actions/types";

const initState = {
  isDataPopulated: false,
  isLoading: true,
  errorMessage: null,
  responseData: {}
};

const ProfileInfoReducer = (state = initState, action) => {
  switch (action.type) {
    case PROFILE_INFO_TYPE.GET_PROFILE_INFO_SUCCESS:
      return {
        ...state,
        isDataPopulated: true,
        isLoading: false,
        responseData: action.payload
      };

    case PROFILE_INFO_TYPE.GET_PROFILE_INFO_STATE:
      return {
        ...state,
        isDataPopulated:
          action.payload === true ? false : state.isDataPopulated,
        isLoading: action.payload
      };

    case PROFILE_INFO_TYPE.GET_PROFILE_INFO_FAILED:
      return {
        ...state,
        isLoading: false,
        isDataPopulated: false,
        errorMessage: action.payload
      };

    case PROFILE_INFO_TYPE.CHANGE_ONE_VALUE:
      return {
        ...state,
        responseData: {
          ...state.responseData,
          [action.payload.key]: action.payload.value
        }
      };

    default:
      return state;
  }
};

export default ProfileInfoReducer;
