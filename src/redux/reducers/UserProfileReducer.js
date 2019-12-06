import { USER_PROFILE_INFO } from "../actions/types";

const initState = {
  isDataPopulated: false,
  isLoading: true,
  errorMessage: null,
  responseData: {}
};

const UserProfileReducer = (state = initState, action) => {
  switch (action.type) {
    case USER_PROFILE_INFO.SUCCESS:
      return {
        ...state,
        isDataPopulated: true,
        isLoading: false,
        responseData: action.payload
      };

    case USER_PROFILE_INFO.LOADING:
      return {
        ...state,
        isDataPopulated:
          action.payload === true ? false : state.isDataPopulated,
        isLoading: action.payload
      };

    case USER_PROFILE_INFO.FAILED:
      return {
        ...state,
        isLoading: false,
        isDataPopulated: false,
        errorMessage: action.payload
      };

    default:
      return state;
  }
};

export default UserProfileReducer;
