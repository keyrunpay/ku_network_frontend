import {
  LOGIN_USER_SUCCESS,
  LOGIN_USER_ISLOADING,
  LOGIN_USER_FAILURE,
  USER_LOGOUT
} from "../actions/types";

const initState = {
  isLogged: false,
  userData: {},
  isLoading: false,
  errorMessage: {
    email: "",
    password: ""
  }
};

const LoginReducer = (state = initState, action) => {
  switch (action.type) {
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLogged: true,
        userData: action.payload
      };

    case LOGIN_USER_ISLOADING:
      return {
        ...state,
        isLogged: action.payload === true ? false : state.isLogged,
        isLoading: action.payload
      };

    case LOGIN_USER_FAILURE:
      return {
        ...state,
        errorMessage: action.payload
      };

    case USER_LOGOUT:
      return {
        ...initState
      };

    default:
      return state;
  }
};

export default LoginReducer;
