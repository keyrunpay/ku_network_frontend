import React from "react";
import { useProfile } from "../../hooks/useProfile";
import mockMaleImg from "../../assets/images/avatar-male.png";
import mockFemaleImg from "../../assets/images/avatar-female.png";
import { checkResponse } from "../../helper/config";

export const CustomUserImageViewer = props => {
  const [userImage, setUserImage] = React.useState(mockMaleImg);

  React.useEffect(() => {
    if (props.image === "af") setUserImage(mockFemaleImg);
    else if (props.image === "am") setUserImage(mockMaleImg);
    else if (checkResponse(props.image)) {
      setUserImage(props.image);
    }
  }, [props.image]);

  return <img src={userImage} alt="" />;
};

export default function UserImageView() {
  const [userImage, setUserImage] = React.useState(mockMaleImg);

  const profile = useProfile();

  React.useEffect(() => {
    if (checkResponse(profile.profile_image)) {
      setUserImage(profile.profile_image);
    } else {
      profile.gender === "Female"
        ? setUserImage(mockFemaleImg)
        : setUserImage(mockMaleImg);
    }
  }, [profile]);

  return <img src={userImage} alt="" />;
}

export const useImage = () => {
  const [userImage, setUserImage] = React.useState(mockMaleImg);

  const profile = useProfile();

  React.useEffect(() => {
    if (checkResponse(profile.profile_image)) {
      setUserImage(profile.profile_image);
    } else {
      profile.gender === "Female"
        ? setUserImage(mockFemaleImg)
        : setUserImage(mockMaleImg);
    }
  }, [profile]);

  return userImage;
};
