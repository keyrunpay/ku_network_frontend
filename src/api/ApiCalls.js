import Axios from "axios";
import { baseUrl } from "../helper/config";

export const doLogin = payload => {
  return Axios.post(baseUrl + "login", payload);
};

export const doRegister = payload => {
  return Axios.post(baseUrl + "register_me", payload);
};

export const doPost = payload => {
  return Axios.post(baseUrl + "post", payload);
};

export const getPost = () => {
  return Axios.get(baseUrl + "post");
};

export const getMyProfileInfo = () => {
  return Axios.get(baseUrl + "my_profile");
};

export const editMyProfileInfo = data => {
  return Axios.post(baseUrl + "my_profile", data);
};

export const getMySkillsExperience = () => {
  return Axios.get(baseUrl + "my_skills");
};

export const addSkill = data => {
  return Axios.post(baseUrl + "skill", data);
};

export const removeSkill = skillId => {
  return Axios.delete(baseUrl + "skill/" + skillId);
};

export const removeEvent = eventId => {
  return Axios.delete(baseUrl + "event/" + eventId);
};

export const addEvent = data => {
  return Axios.post(baseUrl + "event", data);
};

export const addInterest = data => {
  return Axios.post(baseUrl + "interest", data);
};

export const removeInterest = intId => {
  return Axios.delete(baseUrl + "interest/" + intId);
};

export const fetchMyPost = () => {
  return Axios.get(baseUrl + "my_post");
};

export const uploadFile = data => {
  return Axios.post(baseUrl + "upload", data);
};

export const updateDp = data => {
  return Axios.post(baseUrl + "update_dp", data);
};

export const getHomePageData = () => {
  return Axios.get(baseUrl + "homepage");
};

export const submitProfileVerify = () => {
  return Axios.post(baseUrl + "verify");
};

export const getNotification = () => {
  return Axios.get(baseUrl + "notification");
};

export const getPendingRequest = () => {
  return Axios.get(baseUrl + "pending_request");
};

export const verifyUserAdmin = user_id => {
  return Axios.post(baseUrl + "verify/" + user_id);
};

export const rejectUserAdmin = (user_id, payload) => {
  return Axios.post(baseUrl + "reject_verify/" + user_id, payload);
};

export const getUserProfile = user_id => {
  return Axios.get(baseUrl + "view_profile/" + user_id);
};

export const getUserPost = user_id => {
  return Axios.get(baseUrl + "user_post/" + user_id);
};

export const likePost = post_id => {
  return Axios.post(baseUrl + "like/" + post_id);
};
