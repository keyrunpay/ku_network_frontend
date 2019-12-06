import { useSelector } from "react-redux";

export const useProfile = () => {
  const profile = useSelector(state => state.profileInfo.responseData);
  return profile;
};

export const useUserProfile = (onlyResponse = false) => {
  const profile = useSelector(state => state.userProfile);
  if (!onlyResponse) return profile;
  else return profile.responseData;
};

export const isVerified = profileData => {
  if (profileData.verification_status === 0) {
    return false;
  }
  return true;
};
