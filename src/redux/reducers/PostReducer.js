import { POST_TYPES } from "../actions/types";

const initState = {
  isDataPopulated: false,
  isLoading: true,
  errorMessage: null,
  postData: {}
};

const PostReducer = (state = initState, action) => {
  switch (action.type) {
    case POST_TYPES.GET_POST_SUCCESS:
      return {
        ...state,
        isDataPopulated: true,
        isLoading: false,
        postData: action.payload
      };

    case POST_TYPES.POST_LOADING_STATE:
      return {
        ...state,
        isDataPopulated:
          action.payload === true ? false : state.isDataPopulated,
        isLoading: action.payload
      };

    case POST_TYPES.GET_POST_FAILED:
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

export default PostReducer;
