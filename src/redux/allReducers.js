import { combineReducers } from "redux";
import PostReducer from "./reducers/PostReducer";
import LoginReducer from "./reducers/LoginReducer";
import ProfileInfoReducer from "./reducers/ProfileInfoReducer";
import MyPostReducer from "./reducers/MyPostReducer";
import UserProfileReducer from "./reducers/UserProfileReducer";

const allReducers = combineReducers({
  login: LoginReducer,
  post: PostReducer,
  profileInfo: ProfileInfoReducer,
  myPost: MyPostReducer,
  userProfile: UserProfileReducer
});

export default allReducers;
