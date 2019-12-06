import { MY_POST } from "../actions/types";

const initState = {
  isDataPopulated: false,
  isLoading: true,
  errorMessage: null,
  responseData: {}
};

const MyPostReducer = (state = initState, action) => {
  switch (action.type) {
    case MY_POST.SUCCESS:
      return {
        ...state,
        isDataPopulated: true,
        isLoading: false,
        responseData: action.payload
      };

    case MY_POST.LOADING:
      return {
        ...state,
        isDataPopulated:
          action.payload === true ? false : state.isDataPopulated,
        isLoading: action.payload
      };

    case MY_POST.FAILED:
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

export default MyPostReducer;
